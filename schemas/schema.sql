create table clients (
  id int auto_increment primary key,
  name varchar(255) not null,
  type_identification varchar(255) not null,
  number_identification varchar(255) not null,
  observations varchar(500) null,
  createdAt datetime null,
  updatedAt datetime not null
);

create table invoices (
  id int auto_increment primary key,
  date datetime not null,
  name_product varchar(255) not null,
  price decimal(10, 2) not null,
  discount_value decimal(10, 2) not null,
  vat_value decimal(10, 2) not null,
  total_value decimal(10, 2) not null,
  clientId int not null,
  createdAt datetime null,
  updatedAt datetime not null,
  constraint invoices_ibfk_1 foreign key (clientId) references clients (id) on update cascade on delete cascade
);

create index clientId on invoices (clientId);