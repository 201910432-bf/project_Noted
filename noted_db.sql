-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2021 at 03:33 AM
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
  `idea_updateDate` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `idea_table`
--

INSERT INTO `idea_table` (`id`, `idea_title`, `idea_data`, `idea_insertDate`, `idea_updateDate`) VALUES
(11, 'qweee', '', 'Tue, 03/9/2021, 10:27', 'Tue, 03/9/2021, 10:27');

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
  `note_updateDate` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note_table`
--

INSERT INTO `note_table` (`id`, `note_title`, `note_list`, `note_keys`, `checked_list`, `note_insertDate`, `note_updateDate`) VALUES
(261, 'new', 'wqe,ewq', '1,2', '[]', 'Thu, 03/4/2021, 21:49', 'Tue, 03/9/2021, 01:17'),
(262, 'note', 'eqweqwe', '1', '', 'Thu, 03/4/2021, 21:49', 'Fri, 03/5/2021, 14:41'),
(266, 'notete', 'qwe,qwe', '1,2', '', 'Fri, 03/5/2021, 12:16', 'Mon, 03/8/2021, 21:11');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `idea_table`
--
ALTER TABLE `idea_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `note_table`
--
ALTER TABLE `note_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
