alter table allergen
    rename column allergen to name;

alter table characteristic
    rename column characteristic to name;

INSERT INTO allergen (name, icon)
VALUES
('gluten', ''),
('crustaceansAndDerivatives', ''),
('eggsAndDerivatives', ''),
('fishAndDerivatives', ''),
('peanutsAndDerivatives', ''),
('soyAndDerivatives', ''),
('milkAndDerivatives', ''),
('nutsAndDerivatives', ''),
('celeryAndDerivatives', ''),
('mustardAndDerivatives', ''),
('sesameSeedsAndDerivatives', ''),
('sulphurDioxideAndSulphites', ''),
('lupinAndDerivatives', ''),
('molluscsAndDerivatives', '');

INSERT INTO characteristic (name, icon)
VALUES
('vegan', ''),
('vegetarian', ''),
('spicy', ''),
('zeroKm', ''),
('frozenProduct', ''),
('bio', '');

