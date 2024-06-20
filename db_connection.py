import sqlite3

def connection():
    conn = None # initialize before assignment - error handling

    try:
        conn = sqlite3.connect('my_fw.db') # connect to db
    except sqlite3.Error as e:
        print(e)
    return conn