SELECT movies.movie_name AS movie, reviews.review
FROM employees_db
LEFT JOIN department
ON employees_db.department = department.id;
ORDER BY movies.movie_name;

