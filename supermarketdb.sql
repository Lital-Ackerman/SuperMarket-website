-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 09:19 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarketdb`
--
CREATE DATABASE IF NOT EXISTS `supermarketdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `supermarketdb`;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cartId` int(100) NOT NULL,
  `userId` int(15) NOT NULL,
  `cartDate` date NOT NULL,
  `isCompleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cartId`, `userId`, `cartDate`, `isCompleted`) VALUES
(187, 302422621, '2023-02-28', 1),
(188, 302422621, '2023-02-28', 1),
(189, 302422621, '2023-02-28', 1),
(190, 302422621, '2023-02-28', 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(100) NOT NULL,
  `categoryName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES
(1, 'Dairy'),
(2, 'Fruits'),
(3, 'Vegetables'),
(4, 'Bakery'),
(5, 'Candies'),
(6, 'Meat'),
(7, 'Pharm'),
(8, 'Drinks');

-- --------------------------------------------------------

--
-- Table structure for table `itemspercart`
--

CREATE TABLE `itemspercart` (
  `itemId` int(100) NOT NULL,
  `productId` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `totalPerProduct` decimal(10,2) NOT NULL,
  `cartId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `itemspercart`
--

INSERT INTO `itemspercart` (`itemId`, `productId`, `quantity`, `totalPerProduct`, `cartId`) VALUES
(436, 150, 1, '10.00', 187),
(437, 155, 2, '26.00', 187),
(438, 156, 1, '5.00', 187),
(439, 166, 3, '25.50', 187),
(441, 154, 1, '50.00', 187),
(443, 172, 1, '14.50', 187),
(444, 150, 1, '10.00', 188),
(445, 160, 1, '5.00', 188),
(446, 163, 1, '7.00', 188),
(447, 156, 1, '5.00', 189),
(448, 154, 2, '100.00', 189),
(449, 150, 2, '20.00', 190),
(450, 155, 1, '13.00', 190);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(100) NOT NULL,
  `userId` int(100) NOT NULL,
  `cartId` int(100) NOT NULL,
  `orderSum` decimal(10,2) NOT NULL,
  `shipCity` varchar(20) NOT NULL,
  `shipStreet` varchar(20) NOT NULL,
  `shipDate` date NOT NULL,
  `orderDate` datetime NOT NULL,
  `payLastDigits` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `orderSum`, `shipCity`, `shipStreet`, `shipDate`, `orderDate`, `payLastDigits`) VALUES
(167, 302422621, 187, '131.00', 'Haifa', 'Hagome', '2023-03-13', '2023-02-28 21:57:41', 8765),
(168, 302422621, 188, '22.00', 'Haifa', 'Hagome', '2023-03-13', '2023-02-28 21:59:24', 8765),
(169, 302422621, 189, '105.00', 'Haifa', 'Hagome', '2023-03-13', '2023-02-28 22:00:07', 7678);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(100) NOT NULL,
  `productName` varchar(20) NOT NULL,
  `categoryId` int(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `categoryId`, `price`, `image`) VALUES
(149, 'Banana', 2, '5.90', 'banana.jpg'),
(150, 'Milk', 1, '10.00', 'milk.jpg'),
(151, 'Apple', 2, '6.50', 'apple.jpg'),
(152, 'Toilet Paper', 7, '32.00', 'toilet.jpg'),
(153, 'Grapes', 2, '20.00', 'grapes.jpg'),
(154, 'Red Meat', 6, '50.00', 'meat.jpg'),
(155, 'Cheese', 1, '13.00', 'yellow-cheese.jpg'),
(156, 'Choclate', 1, '5.00', 'chocolate.jpg'),
(157, 'Salmon', 6, '90.00', 'salmon.jpg'),
(158, 'Shampoo', 7, '12.00', 'shampoo.jpg'),
(159, 'Chips', 5, '6.00', 'chips.jpg'),
(160, 'Bamba', 5, '5.00', 'bamba.jpg'),
(161, 'Bisli', 5, '7.00', 'bisli.jpg'),
(162, 'Pringles', 5, '14.00', 'pringles.jpg'),
(163, 'Dubonim', 5, '7.00', 'dubonim.jpg'),
(165, 'Conditioner', 7, '12.90', 'conditioner.jpg'),
(166, 'Bread', 4, '8.50', 'bread.jpg'),
(167, 'Rolls', 4, '14.90', 'rolls.jpg'),
(168, 'Cucumber', 3, '3.90', 'cucumber.jpg'),
(169, 'Tomato', 3, '4.90', 'tomato.jpg'),
(170, 'Strawberry', 2, '20.00', 'strawberry.jpg'),
(171, 'Eggplant', 3, '6.50', 'eggplant.jpg'),
(172, 'Hairbrush', 7, '14.50', 'HairBrush.jpg'),
(173, 'Hands Soap', 7, '13.00', 'handSoap.jpg'),
(176, 'Pitot', 4, '15.00', 'pitot.jpg'),
(177, 'Hair Cream', 7, '17.90', 'hairCream.jpg'),
(178, 'Coca Cola', 8, '9.00', 'cola.jpg'),
(179, 'Orange Juice', 8, '25.00', 'orangeJuice.jpg'),
(180, 'Water', 8, '6.50', 'mineralWater.jpg'),
(181, 'Peach', 2, '5.00', 'peach.jpg'),
(182, 'Onion', 3, '4.90', 'onion.jpg'),
(183, 'Lemon', 3, '5.50', 'lemon.jpg'),
(184, 'Pepper', 3, '7.90', 'pepper.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `userId` int(9) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `city` varchar(20) NOT NULL,
  `street` varchar(20) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`firstName`, `lastName`, `userId`, `username`, `password`, `city`, `street`, `role`) VALUES
('shira', 'cohen', 300481164, 'shira@gmail.com', '12345677a!', 'Beer-Sheva', 'Dor', 0),
('Lital', 'Ackerman', 300481165, 'litala@gmail.com', '12345678a!', 'Jerusalem', 'Hakane', 1),
('Moti', 'Nadav', 302422621, 'moti@gmail.com', 'motmot12@', 'Haifa', 'Hagome', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `itemspercart`
--
ALTER TABLE `itemspercart`
  ADD PRIMARY KEY (`itemId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cartId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `itemspercart`
--
ALTER TABLE `itemspercart`
  MODIFY `itemId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=451;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `itemspercart`
--
ALTER TABLE `itemspercart`
  ADD CONSTRAINT `itemspercart_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `carts` (`cartId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `itemspercart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `carts` (`cartId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
