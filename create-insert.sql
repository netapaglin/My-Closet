create database my_closet;

use my_closet;

create table users(
id int(10),
name varchar(100),
last_name varchar(100),
email varchar(100),
password varchar(100),
city varchar(100),
street varchar(100),
admin boolean,
primary key(id)
);

create table category(
id int auto_increment,
category_name varchar(100),
primary key(id)
);

create table product(
id int auto_increment,
name varchar(100),
category_id int,
price int,
img text default "https://demolay.org/wp-content/uploads/2018/12/Vacation.jpg",
primary key(id),
foreign key(category_id) references category(id)
);
 
create table cart(
cartId int auto_increment,
user_id int,
date datetime default now(),
status boolean,
primary key(cartId),
foreign key(user_id) references users(id)
);

create table cart_item(
id int auto_increment,
product_id int,
cart_id int,
quantity int,
size varchar(10),
primary key(id),
foreign key(product_id) references product(id),
foreign key(cart_id) references cart(cartId)
);

create table orders(
id int auto_increment,
cart_id int,
final_price int,
street varchar(200),
city varchar(200),
order_date datetime default now(),
arrival_date date,
creditcard int,
primary key(id),
foreign key(cart_id) references cart(cartId)
);


insert into users(id, name, last_name, email, password, city, street, admin )
values(314509874, 'Noga','Noga', 'noga@gmail.com', '123', 'Tel Aviv', 'Bazel',  true),
(62225433, 'Neta','Neta', 'neta@gmail.com', '111', 'Tel Aviv', 'Beeri',  false),
(262888875, 'Adi','Adi', 'adi@gmail.com', '222', 'Tel Aviv', 'Beeri',  false),
(260444474, 'mmm','mmm', 'mmm@gmail.com', 'mmm', 'Tel Aviv', 'Beeri',  false),
(15118742, 'Roni','Roni', 'roni@gmail.com', '333', 'Givataim', 'Remez',  false);

insert into category(category_name)
values('Shirts'),('Coats and Jackets'),('Dresses'),('Sweatshirt'),('Jeans'),('Trousers');

insert into product(name, category_id, price, img)
values('Slim Jeans', 5, 35, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G79/shotview-315x472/16/M16-268s.jpg'),
(' Mid Blue Denim', 5, 40, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G66/shotview-315x472/187/296-589s.jpg'),
('Black Broderie Sleeve', 3, 10, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G64/shotview-315x472/562/A58-366s.jpg'),
('Sage Green Blazer Coat', 2, 50, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G26/shotview-315x472/93/M47-292s.jpg'),
('Belted Tech Cargo Trousers', 6, 20, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G25/shotview-315x472/380/740-071s.jpg'),
('Crew Neck T-Shirt', 1, 6, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/943571s.jpg'),
('Curved Hem T-Shirt', 1, 40, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G28/shotview-315x472/108/T22-582s.jpg'),
('Cap Sleeve T-Shirt', 1, 5, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/T25036s.jpg'),
('Slouch V-Neck Long Sleeve T-Shirt', 1, 10, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/207598s.jpg'),
('Boxy T-Shirt', 1, 25, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/T30548s.jpg'),
('Revere Collar Teddy Borg Coat', 2, 60, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G66/shotview-315x472/81/121-401s.jpg'),
('Twill Jacket', 2, 30, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G64/shotview-315x472/39/T24-831s.jpg'),
('Jacobsen Puffer Coat', 2, 75, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/A53245s.jpg'),
('Teddy Borg Coat', 2, 52, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G79/shotview-315x472/65/589-805s.jpg'),
('Shirt Dress', 3, 30, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/T07459s.jpg'),
('Tie Waist Tiered Dress', 3, 40, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/A75541s4.jpg'),
('Satin Tie Neck Midi Dress', 3, 50, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G28/shotview-315x472/42/M65-521s2.jpg'),
('Statement Maxi Dress', 3, 70, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/291321s.jpg'),
('adidas Core 18 Hoodie', 4, 55, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G64/shotview-315x472/2219/T15-513s.jpg'),
('Lacoste Grey Sweatshirt', 4, 180, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/A53464s.jpg'),
('adidas Tracksuit', 4, 70, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/M37102s.jpg'),
('Lacoste® Full Zip Track Top', 4, 170, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/C70331s.jpg'),
('Zip Through Hoodie', 4, 30, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/755179s2.jpg'),
('Jersey Hoodie', 4, 28, 'https://xcdn.next.co.uk/common/Items/Default/Default/Publications/G26/shotview-315x472/2011/801-775s.jpg');


insert into cart(user_id, status)
values(62225433, false),
(62225433, false),
(62225433, true),
(262888875, true);

insert into cart(user_id, status)
values(262888875, false);

insert into cart(user_id, status)
values(260444474, true);

insert into cart_item(product_id, cart_id, quantity, size )
values(1, 1, 2, 'm'),(2, 1, 1, 's'),(3, 1, 2, 's'),
(3, 2, 3, 'l'),(2, 2, 1, 's'),(7, 2, 3, 's'),
(7, 3, 2, 'xl'),(5, 3, 1, 's'),(1, 3, 3, 'm'),
(9, 4, 1, 'm');



insert into orders(cart_id, final_price, street, city, arrival_date, creditcard)
values(1, 35,'Bazel','Tel Aviv', '2022/04/06' ,1515 ),
(2, 85,'Bazel','Tel Aviv', '2022/05/03' ,1515 ),
(3, 27,'Bazel','Tel Aviv', '2022/05/06' ,1515 ),
(4, 70, 'Remez', 'Givataim', '2022/05/08', 5151 );



