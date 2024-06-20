import sqlite3
from flask import Flask, render_template, request, redirect, url_for, jsonify
from db_connection import connection
import datetime

app = Flask(__name__)

def get_db():
    conn = connection()
    return conn

@app.route('/')
def index():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM items;")
    items = cur.fetchall()
    conn.close()
    return render_template('index.html', items=items)

@app.route('/insert_item', methods=['POST'])
def insert_item():
    conn = get_db()
    cur = conn.cursor()
    brand_name = request.form['brand_name']
    city = request.form['city']
    date = datetime.datetime.strptime(request.form['date'], "%Y-%m-%d").date()
    notes = request.form['notes']
    cur.execute("INSERT INTO items (brand_name, city, date, notes) VALUES (?,?,?,?);",
                (brand_name, city, date, notes))
    conn.commit()
    conn.close()
    print("Item added successfully!")  # Console statement for reassurance
    #return 'Item added successfully!'
    return redirect(url_for('index'))

@app.route('/search')
def search():
    columns = ['id', 'brand_name', 'city', 'date']  # column names
    return render_template('search.html', columns=columns)

@app.route('/search_results', methods=['POST'])
def search_results():
    column = request.form['column']
    search_term = request.form['search_term']

    conn = sqlite3.connect('my_fw.db')
    c = conn.cursor()

    try:
        query = f"SELECT * FROM items WHERE {column} LIKE?"
        c.execute(query, (f"%{search_term}%",))
        results = c.fetchall()
    except sqlite3.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Database error"}), 500

    conn.close()

    results = [{"id": row[0], "name": row[1], "description": row[2]} for row in results]
    return render_template('search.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)