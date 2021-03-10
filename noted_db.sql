-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2021 at 10:52 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noted_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `idea_table`
--

CREATE TABLE `idea_table` (
  `id` int(11) NOT NULL,
  `idea_title` varchar(255) NOT NULL,
  `idea_data` varchar(1000) NOT NULL,
  `idea_insertDate` varchar(30) NOT NULL,
  `idea_updateDate` varchar(30) NOT NULL,
  `userId` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `idea_table`
--

INSERT INTO `idea_table` (`id`, `idea_title`, `idea_data`, `idea_insertDate`, `idea_updateDate`, `userId`) VALUES
(88, 'eqwe', '', 'Wed, 03/10/2021, 17:45', 'Wed, 03/10/2021, 17:45', 5),
(89, 'asd', '', 'Wed, 03/10/2021, 17:45', 'Wed, 03/10/2021, 17:45', 5),
(90, 'asd', '', 'Wed, 03/10/2021, 17:49', 'Wed, 03/10/2021, 17:49', 5);

-- --------------------------------------------------------

--
-- Table structure for table `note_table`
--

CREATE TABLE `note_table` (
  `id` int(11) NOT NULL,
  `note_title` varchar(155) NOT NULL,
  `note_list` varchar(255) NOT NULL,
  `note_keys` varchar(255) NOT NULL,
  `checked_list` varchar(1000) NOT NULL,
  `note_insertDate` varchar(30) NOT NULL,
  `note_updateDate` varchar(30) NOT NULL,
  `userId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note_table`
--

INSERT INTO `note_table` (`id`, `note_title`, `note_list`, `note_keys`, `checked_list`, `note_insertDate`, `note_updateDate`, `userId`) VALUES
(290, 'asd', '', '', '', 'Wed, 03/10/2021, 17:04', 'Wed, 03/10/2021, 17:04', 5),
(291, 'we', '', '', '', 'Wed, 03/10/2021, 17:09', 'Wed, 03/10/2021, 17:09', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `username`, `password`) VALUES
(3, '\"qwe\"', 'pbkdf2$1000$49f4f98a67e15ea81fbc452adb8ad7ce79c32f16b852987745ed3de860cedf3a368f6ed735481982ddbd9f39e17712c132eca6428a404cd70366fe10d08231b25ac85694b62804bf6b1b88651f9370536869ce71512f78f53693dff0c7f64f038da683dba31e660805f205782c0d077c37b28e6a74d6b527b7a8f6394af5999c$7b21e6ad833e3b8ec2d550f3edfd4812d5c5952c69ef657b2ababde3f7be'),
(5, '222', 'pbkdf2$1000$86471fab52c2bfafcb3018db1ce8e18876c55e1b6b2e6980a57b9944527dd16deb53b9bdf4e8b7acfa7a20d40352c5a1343a235c06d612f0ef0f88443614532b64f0b254ad59bb83d55f56e85f97020353d935993eae17040fed11afbb82f1a0ed33029c935592f1728faa256fee14d94cbd4e99f598980ad62258c45bd9f8de$8c7e47e44392be31336916248e8748c4991e57833acafe3869d6f6b1e5a7'),
(6, '\"444\"', 'pbkdf2$1000$99cadd866d0db5c389355db9849df0496153917d82a4bab54e322451345c61d597e16a9cb03d9d83e992181016368811cc623961c47edaab7280fb303875831dd19aba8b577c0aede03a107fba702ca4b854dad0bf53ff4217397be29cd704c877dd9eec6256f952d963363e048b9ad6294aad25a34a31fa6d7b4a1a1e75bd69$6c1b357fcc92ebb4a56998525bd3decc593b31485518728f9cec897fb7d1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `idea_table`
--
ALTER TABLE `idea_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `note_table`
--
ALTER TABLE `note_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `idea_table`
--
ALTER TABLE `idea_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `note_table`
--
ALTER TABLE `note_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
