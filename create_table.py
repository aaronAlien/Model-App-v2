from db_connection import connection

def create_table():
    conn = connection()
    if conn is not None:
        try:
            cur =  conn.cursor()
            cur.execute(
                """ CREATE TABLE items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    brand_name TEXT NOT NULL,
                    city TEXT NOT NULL,
                    date DATE NOT NULL,
                    notes TEXT);""")
            conn.commit()
            print('success, table created.')

        except sqlite3.Error as e:
            print(e)
    
    else:
        print('ERROR! Cannont connect to db.')

if __name__ == '__main__':
    create_table()