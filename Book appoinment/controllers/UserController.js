const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sharpener'
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = {
    // Insert user
    insertUser: (req, res) => {
        const { username, email, phone } = req.body;
        const newUser = { username, email, phone };
        connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
            if (error) {
                console.error('Error inserting user:', error);
                res.status(500).json({ error: 'Failed to insert user' });
            } else {
                newUser.id = results.insertId;
                res.status(201).json(newUser);
            }
        });
    },

    // Get all users
    getAllUsers: (req, res) => {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Failed to fetch users' });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // Delete user
    deleteUser: (req, res) => {
        const { id } = req.params;
        connection.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ error: 'Failed to delete user' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        });
    }
};
