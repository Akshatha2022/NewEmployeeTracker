INSERT INTO department (name)
VALUES ("IT"), 
("Marketing"), 
("Finance"), 
("Sales"), 
("HR");

INSERT INTO role(title, salary, department_id)
VALUES('Engineer', 95000, 1), 
('Senior Engineer', 125000, 1), 
('CFO', 350000, 3), 
('Sales Head',280000,4)
('Chief Counsel', 300000, 5);
('Marketing Head', 300000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Aadhrith', 'Ajay', 1, 1), 
('Akshatha', 'Krishnamurthy', 2, 1), 
('Abhishek', 'Krishnamurthy', 3, 3), 
('Girija', 'Nagaraj', 5, 4), 
('Krishnamurthy', 'Narasimhamurthy', 5, 5);
('Ajay', 'Sridhara',4,2)
       
