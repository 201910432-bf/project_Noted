-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2021 at 11:54 AM
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
-- Table structure for table `note_table`
--

CREATE TABLE `note_table` (
  `id` int(11) NOT NULL,
  `note_title` varchar(155) NOT NULL,
  `note_list` varchar(255) NOT NULL,
  `note_keys` varchar(255) NOT NULL,
  `note_insertDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `note_updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note_table`
--

INSERT INTO `note_table` (`id`, `note_title`, `note_list`, `note_keys`, `note_insertDate`, `note_updateDate`) VALUES
(1, 'test title', 'new,assignment,newnew,test,tesing..', '1,2,3,4,5', '2021-02-14 12:29:05.391505', '2021-02-14 12:29:05.391505'),
(2, 'test title 2', 'ne2w,module,newnew,test,tesing..,additional,data,hello,world', '1,2,3,4,5,6,7,8,9', '2021-02-14 07:29:05.391505', '2021-02-14 12:29:05.391505'),
(3, 'mynote', '', '', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(4, 'test insert', '', '', '2021-02-17 10:00:29.000000', '2021-02-17 10:00:29.000000'),
(5, 'wqe', '', '', '2021-02-17 10:11:47.000000', '2021-02-17 10:11:47.000000'),
(6, 'qwe', '', '', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note_table`
--
ALTER TABLE `note_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `note_table`
--
ALTER TABLE `note_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
