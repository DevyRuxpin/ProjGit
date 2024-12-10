-- write your queries here
SELECT * FROM owner o FULL OUTER JOIN vehicles v ON o.id=v.owner_id;

SELECT first_name, last_name, COUNT(owner_id) FROM owners o JOIN vehicles v on o.id=v.owner_id 
GROUP BY (first_name, last_name) ORDER BY first_name;

SELECT o.first_name, o.last_name, 
       AVG(v.price)::INTEGER AS average_price, 
       COUNT(v.id) AS vehicle_count
FROM owners o
JOIN vehicles v ON o.id = v.owner_id
GROUP BY o.first_name, o.last_name
HAVING COUNT(v.id) > 1 AND AVG(v.price) > 10000
ORDER BY o.first_name DESC;