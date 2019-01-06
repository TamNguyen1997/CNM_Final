-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 06, 2019 at 02:29 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `internet_banking`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `user_id` int(11) NOT NULL,
  `number` int(10) NOT NULL,
  `balance` int(15) NOT NULL DEFAULT '0',
  `status` int(3) DEFAULT '0',
  `type_account` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`user_id`, `number`, `balance`, `status`, `type_account`, `createdAt`, `updatedAt`) VALUES
(13, 1, 12341234, 1, 1, '2018-12-29 16:56:01', '2018-12-29 16:56:01'),
(13, 100000000, 0, 1, 2, '2018-12-29 16:56:01', '2018-12-29 16:56:01'),
(13, 100000001, 213, 1, 3, '2018-12-29 16:56:01', '2018-12-29 16:56:01'),
(10, 100000002, 13341234, 1, 0, '2018-12-29 11:07:05', '2019-01-05 19:30:28'),
(15, 100000003, 0, 0, 0, '2019-01-05 19:36:18', '2019-01-05 19:36:18');

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaction`
--

CREATE TABLE `detail_transaction` (
  `id_tranaction` int(11) NOT NULL,
  `type_balance` int(3) NOT NULL,
  `amount_money` int(11) NOT NULL,
  `fee_payment` int(3) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hint`
--

CREATE TABLE `hint` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `accNumber` int(10) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hint`
--

INSERT INTO `hint` (`username`, `accNumber`, `id`) VALUES
('13', 100000003, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `accountSrc` int(11) NOT NULL,
  `accountDes` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` int(11) NOT NULL,
  `description` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `fee` int(11) NOT NULL DEFAULT '1000',
  `verify` int(11) NOT NULL DEFAULT '0',
  `feeCharger` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `accountSrc`, `accountDes`, `createdAt`, `updatedAt`, `total`, `description`, `fee`, `verify`, `feeCharger`) VALUES
(1, 100000000, 1, '2019-01-05 20:46:46', '2019-01-05 20:46:46', 453, '453', 1000, 0, 1),
(2, 100000000, 1, '2019-01-05 20:47:53', '2019-01-05 20:47:53', 453, '453', 1000, 0, 1),
(3, 100000000, 1, '2019-01-05 20:52:47', '2019-01-05 20:52:47', 453, '453', 1000, 0, 1),
(4, 100000000, 1, '2019-01-05 20:56:32', '2019-01-05 20:56:32', 453, '453', 1000, 0, 1),
(5, 100000000, 1, '2019-01-05 21:00:14', '2019-01-05 21:00:14', 453, '453', 1000, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `type_account`
--

CREATE TABLE `type_account` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `type_account`
--

INSERT INTO `type_account` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Tài khoản tiết kiêm', '2019-01-05 20:11:18', '2019-01-05 20:11:18'),
(2, 'Tài khoản tín dụng', '2019-01-05 20:11:42', '2019-01-05 20:11:42'),
(3, 'Tài khoản tiền vay', '2019-01-05 20:12:44', '2019-01-05 20:12:44'),
(4, 'Tiền gửi có thời hạn', '2019-01-05 20:13:14', '2019-01-05 20:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `address` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(1) NOT NULL,
  `number_account` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `type`, `createdAt`, `updatedAt`, `name`, `date_of_birth`, `address`, `phone`, `email`, `status`, `number_account`) VALUES
(10, 'VAT', '202cb962ac59075b964b07152d234b70', 'user', '2018-12-25 15:41:55', '2018-12-25 15:41:55', '0', '0000-00-00 00:00:00', '0', '0', '0', 1, 0),
(13, 'user', '21232f297a57a5a743894a0e4a801fc3', 'user', '2018-12-30 12:37:22', '2018-12-30 12:37:22', 'user', '0000-00-00 00:00:00', '', '0929307205', 'vuanhtai1997@gmail.com', 1, 0),
(14, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', '2019-01-05 21:22:42', '2019-01-05 21:22:42', 'admin', '0000-00-00 00:00:00', '', '', '', 0, 0),
(15, 'staff1', '21232f297a57a5a743894a0e4a801fc3', '0', '2019-01-05 19:32:10', '2019-01-05 19:32:10', 'Tài Vũ Anh', '0000-00-00 00:00:00', '', '1655925039', 'vu_anh_tai_com_vn@yahoo.com', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`number`);

--
-- Indexes for table `hint`
--
ALTER TABLE `hint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type_account`
--
ALTER TABLE `type_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `number` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000004;

--
-- AUTO_INCREMENT for table `hint`
--
ALTER TABLE `hint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `type_account`
--
ALTER TABLE `type_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
