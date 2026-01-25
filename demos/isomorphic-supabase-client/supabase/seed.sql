-- Insert drinks menu
INSERT INTO drinks (name, base_price) VALUES
    ('Drip Coffee', 3.00),
    ('Cortado', 3.75),
    ('Cappuccino', 4.00),
    ('Latte', 4.50),
    ('Mocha', 4.50),
    ('Cold Brew', 4.00),
    ('Water Cup', 0.00);

-- 8 unique customers, 10 orders total (Lewis and Max came back)
INSERT INTO orders (name, status, created_at) VALUES
    ('Lewis', 'completed', '2026-01-24 09:12:00-05'),
    ('Max', 'completed', '2026-01-24 09:14:30-05'),
    ('Charles', 'completed', '2026-01-24 09:17:15-05'),
    ('Lando', 'completed', '2026-01-24 09:21:00-05'),
    ('Carlos', 'completed', '2026-01-24 09:24:45-05'),
    ('Oscar', 'completed', '2026-01-24 09:28:00-05'),
    ('Lewis', 'completed', '2026-01-24 09:31:30-05'),  -- Lewis came back for water cup
    ('George', 'completed', '2026-01-24 09:35:00-05'),
    ('Fernando', 'pending', '2026-01-24 09:38:15-05'),
    ('Max', 'pending', '2026-01-24 09:41:00-05');       -- Max came back for second cold brew

-- Insert order_drinks
INSERT INTO order_drinks (order_id, drink_id, size, quantity, unit_price) VALUES
    (1, 4, 'large', 1, 4.50),   -- Lewis - morning latte
    (2, 6, 'large', 1, 4.00),   -- Max - cold brew to start the day
    (3, 2, 'small', 1, 3.75),   -- Charles - cortado, keeping it classic
    (4, 3, 'medium', 1, 4.00),  -- Lando - cappuccino
    (4, 1, 'medium', 1, 3.00),  --       - drip for a friend
    (5, 5, 'large', 1, 4.50),   -- Carlos - mocha guy
    (6, 1, 'large', 2, 3.00),   -- Oscar - double drip coffee morning
    (7, 7, 'small', 1, 0.00),   -- Lewis returns - just a water cup
    (8, 4, 'medium', 1, 4.50),  -- George - latte
    (8, 2, 'small', 1, 3.75),   --        - cortado
    (9, 5, 'medium', 1, 4.50),  -- Fernando - still making his mocha
    (10, 6, 'medium', 1, 4.00); -- Max returns for another cold brew
