import { pool } from "../database/conection.js";

export const getEmployees = async (req, res) => {
    try {        
        const [rows] = await pool.query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error to get employees' });
    }    
}

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error to get employee' });
    }
    
}

export const storeEmployee = async (req, res) => {
    try {
        const { name, salary } = req.body;
        const [rows] = await pool.query('INSERT INTO employees (name, salary) VALUES (?, ?)', [name, salary]);
        res.send({ id: rows.insertId, name, salary });
    } catch (error) {
        res.status(500).json({ message: 'Error to store employee' });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, salary } = req.body;
        
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id])

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error to update employee' });
    }
}

export const destroyEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Error to delete employee' });
    }
}

