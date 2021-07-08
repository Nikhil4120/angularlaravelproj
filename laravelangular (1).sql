-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2021 at 02:13 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravelangular`
--

-- --------------------------------------------------------

--
-- Table structure for table `abouts`
--

CREATE TABLE `abouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `developed_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebookurl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagramurl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `twitterurl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `abouts`
--

INSERT INTO `abouts` (`id`, `title`, `developed_by`, `description`, `email`, `contact`, `facebookurl`, `instagramurl`, `twitterurl`, `created_at`, `updated_at`) VALUES
(1, 'E-Shopper Online Website', 'Nikhil Shah', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'nikhilvshah12274@gmail.com', '8460469135', 'https://www.facebook.com/', 'https://www.instagram.com/', 'https://www.twitter.com/', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `billinginformations`
--

CREATE TABLE `billinginformations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `country` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `billinginformations`
--

INSERT INTO `billinginformations` (`id`, `user_id`, `street`, `city`, `state`, `country`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(2, 6, '3060,Ubhosher,Vanmali vanka ni Pole', 1, 1, 1, 1, NULL, NULL),
(3, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(4, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(5, 17, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(6, 18, '3060,Ubhosher,Vanmali vanka ni Pole', 1, 1, 1, 1, NULL, NULL),
(7, 6, 'UBHOSHER SHAHPUR', 2, 2, 1, 1, NULL, NULL),
(8, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(9, 20, 'Ubhosher', 1, 1, 1, 1, NULL, NULL),
(10, 21, '3060,Ubhosher,Vanmali vanka ni Pole', 1, 1, 1, 1, NULL, NULL),
(11, 22, 'SUgad', 1, 1, 1, 1, NULL, NULL),
(12, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `category_description`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Womens', 'Clothes For Womens', 1, '2021-06-23 05:55:24', '2021-06-23 07:10:19'),
(3, 'Men', 'this is clothes for men', 1, '2021-06-23 07:35:14', '2021-06-25 01:23:15'),
(4, 'Kids', 'This is For Kids', 1, '2021-06-25 10:42:41', '2021-06-30 01:09:13'),
(5, 'Accesories', 'abcdeffbnm', 1, '2021-07-03 00:02:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `state_id` int(11) NOT NULL,
  `city_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `state_id`, `city_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'AHMEDABAD', 1, '2021-06-24 12:19:16', NULL),
(2, 2, 'jodhpur', 1, '2021-06-24 12:19:41', '2021-06-24 12:20:56');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `color_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color_name`, `color_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Black', '#000000', 1, '2021-06-24 01:53:19', '2021-06-24 03:06:44'),
(2, 'Green', '#00ff00', 1, '2021-06-24 02:04:29', '2021-06-24 02:58:40'),
(3, 'Red', '#ff0000', 1, '2021-06-24 03:38:01', NULL),
(4, 'Yellow', '#fff714', 1, '2021-06-24 03:38:53', NULL),
(5, 'Blue', '#0000ff', 1, '2021-06-24 03:39:28', '2021-06-24 03:39:49'),
(6, 'Orange', '#f28d20', 1, '2021-06-27 07:45:57', NULL),
(7, 'Pink', '#ea4748', 1, '2021-06-27 07:47:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'i have faced issue during registration', 1, '2021-07-04 08:09:42', NULL),
(2, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'i have faced issue during registration', 1, '2021-07-04 08:10:25', NULL),
(3, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'i have faced issue during registration', 1, '2021-07-04 08:10:53', NULL),
(4, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'jhtrert', 'yturytsrtgfh gf', 1, '2021-07-04 08:13:09', NULL),
(5, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'jhtrert', 'yturytsrtgfh gf', 1, '2021-07-04 08:16:35', NULL),
(6, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'hfd', 'asdfghjgfd', 1, '2021-07-04 08:17:04', NULL),
(7, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'hfd', 'asdfghjgfd', 1, '2021-07-04 08:20:35', NULL),
(8, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'HELLO', 'dfghbvcxz', 1, '2021-07-04 08:22:19', NULL),
(9, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'HELLO', 'asdfghmvs', 1, '2021-07-04 08:27:44', NULL),
(10, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'asdfghvcx', 1, '2021-07-04 08:28:51', NULL),
(11, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'ASDFGG', 1, '2021-07-04 08:29:59', NULL),
(12, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'asdfghgfdsa', 1, '2021-07-04 08:30:53', NULL),
(13, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'kjhkjtyrterty', 1, '2021-07-04 10:47:30', NULL),
(14, 'ANJALI V SHAH', 'nikhilvshah12274@gmail.com', 'Registration', 'I have faced issue', 1, '2021-07-05 00:36:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country_name`, `country_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'India', '+91', 1, '2021-06-24 07:27:05', '2021-06-24 11:00:37'),
(2, 'Pakistan', '+92', 1, '2021-06-24 11:02:08', NULL),
(3, 'Australia', '+61', 1, '2021-06-24 11:02:46', NULL),
(4, 'U.S.', '+1', 1, '2021-06-25 03:16:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frontusers`
--

CREATE TABLE `frontusers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('Male','Female') COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneno` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileno` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `intrest` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `frontusers`
--

INSERT INTO `frontusers` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `gender`, `phoneno`, `mobileno`, `intrest`, `status`, `created_at`, `updated_at`) VALUES
(6, 'nikhil42', 'Nikhil', 'SHAH', 'nikhilvshah12274@gmail.com', '$2y$10$U4V7npM.1vk6G5sxkqCqiOe47L9YYSxZi3xODNRV.9T8Xr4OBAevC', 'Male', '8460469135', '09104653449', 'men,women,kids,swimming', 1, NULL, NULL),
(9, 'nikhil4120', 'nikhil', 'shah', 'nikhilshah4120@gmail.com', '$2y$10$U4V7npM.1vk6G5sxkqCqiOe47L9YYSxZi3xODNRV.9T8Xr4OBAevC', 'Male', '8460469135', '09104653449', 'men,women', 1, NULL, NULL),
(12, 'nik', 'nikhil', 'shah', 'niks04446@gmail.com', '$2y$10$RkyH.K2fQjmGtUddLfo/q.6j48A7Zps8i1/Vnk.OqQ1UIGyAMFJ/i', 'Male', '25623789', '8460469135', 'men,women,kids', 1, NULL, NULL),
(14, 'nikhil', 'nikhil', 'SHAH', 'admin@gmail.com', '$2y$10$oZDx7f9eJ1NYQvdu1lC/buNGX1Yi4oH6tomTSVuyr96ST6lpdufLa', 'Male', '09104653449', '09104653449', 'men,women,kids', 1, NULL, NULL),
(15, 'nikhil', 'nikhil', 'shah', 'abc@gmail.com', '$2y$10$Ri0rVmb7yfxDlYKVICB.iuslSa/EeMsAGjED7ffLdjgB47.yKt9BC', 'Male', '9104653449', '09104653449', 'men,women,kids', 1, NULL, NULL),
(18, 'nikhil4120', 'nikhil', 'shah', 'mno1232@gmail.com', '$2y$10$86dhOaQazpi2QA3Civ4yde3iPu4SxXfL0hg6d2..ntQCY0B619v2O', 'Male', '9104653449', '09104653449', 'men,women,kids', 1, NULL, NULL),
(19, 'Vivek', 'vivek', 'Chauhan', 'xyz123@gmail.com', '$2y$10$l/Y5s3KA4X3KlCkM9tZvW.M.w.CMZaNBgHwQGy6iBYtm8uaMDXRQO', 'Male', '9104653449', '09104653449', '', 1, NULL, NULL),
(20, 'Vinod', 'John', 'pickard', 'abc789@gmail.com', '$2y$10$EUngd4wwEiZ0P1wz0cV0Puizse5Kmj7MyAtc9Rt3KIl7FJcZVpsNG', 'Male', '9104653449', '9429065215', 'men,women,kids', 1, NULL, NULL),
(21, 'nikhil', 'Dhruvil', 'patel', 'abcde@gmail.com', '$2y$10$08dOqeoga1iYjSlRdHSIbOjdYxU0Ji94o1wzgkoATmNM/EW1gCJJW', 'Male', '9104653449', '09104653449', 'men,women,kids', 1, NULL, NULL),
(22, 'nikhil', 'nikhil', 'shah', 'xyz987@gmail.com', '$2y$10$Ir3RNxkBYwrozHGNalFJuOGg8jDrZCuXfmSsBFRmE63y9GefbkWw2', 'Male', '9104653449', '09104653449', 'men,women,kids', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2014_10_12_200000_add_two_factor_columns_to_users_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2021_06_23_073723_create_sessions_table', 1),
(7, '2021_06_23_081553_create_frontusers_table', 2),
(8, '2021_06_23_083556_create_categories_table', 3),
(9, '2021_06_23_083644_create_subcategories_table', 3),
(10, '2021_06_23_083729_create_products_table', 3),
(11, '2021_06_23_083840_create_orders_table', 3),
(12, '2021_06_23_083922_create_contacts_table', 3),
(13, '2021_06_23_084031_create_countries_table', 3),
(14, '2021_06_23_084053_create_states_table', 3),
(15, '2021_06_23_084114_create_cities_table', 3),
(16, '2021_06_23_084148_create_colors_table', 3),
(17, '2021_06_23_084215_create_sizes_table', 3),
(18, '2021_06_23_084322_create_shippinginformations_table', 3),
(19, '2021_06_23_084409_create_billinginformations_table', 3),
(20, '2021_06_23_084501_create_taxamounts_table', 3),
(21, '2021_07_02_063737_create_newsletters_table', 4),
(22, '2021_07_02_064027_create_newsletterusers_table', 5),
(23, '2021_07_05_053104_create_wishlists_table', 6),
(24, '2021_07_05_101726_create_sliders_table', 7),
(25, '2021_07_05_104338_create_testimonials_table', 8),
(26, '2021_07_08_105811_create_abouts_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletters`
--

INSERT INTO `newsletters` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(3, 'ipl match', 'agrsdhyfjuki lukyjt', NULL, NULL),
(4, 'ipl match', 'agrsdhyfjuki lukyjt', NULL, NULL),
(5, 'ipl match', 'agrsdhyfjuki lukyjt', NULL, NULL),
(6, 'ipl match', 'Today is ipl match', NULL, NULL),
(7, 'ipl match', 'Today is ipl match', NULL, NULL),
(8, 'ipl match', 'Today is ipl match', NULL, NULL),
(9, 'Sorry For Inconvinience', 'sorry...', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `newsletterusers`
--

CREATE TABLE `newsletterusers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletterusers`
--

INSERT INTO `newsletterusers` (`id`, `email`, `created_at`, `updated_at`) VALUES
(1, 'nikhilvshah12274@gmail.com', NULL, NULL),
(4, 'nikhilshah4120@gmail.com', NULL, NULL),
(5, 'niks04446@gmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `delievery_status` int(11) NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `user_id`, `quantity`, `total_amount`, `delievery_status`, `status`, `created_at`, `updated_at`) VALUES
(1, 10, 6, 1, 700, 1, 1, '2021-07-05 23:33:53', NULL),
(2, 10, 6, 1, 700, 1, 1, '2021-07-05 23:40:10', NULL),
(3, 10, 6, 1, 700, 1, 1, '2021-07-05 23:40:53', NULL),
(4, 9, 6, 1, 300, 1, 1, '2021-07-07 03:36:59', NULL),
(5, 9, 6, 1, 300, 1, 1, '2021-07-07 03:41:49', NULL),
(6, 7, 6, 2, 1000, 1, 1, '2021-07-07 03:44:29', NULL),
(7, 10, 6, 1, 700, 1, 1, '2021-07-07 03:56:39', NULL),
(8, 10, 6, 1, 700, 1, 1, '2021-07-07 04:07:24', NULL),
(9, 10, 6, 1, 700, 1, 1, '2021-07-07 04:23:30', NULL),
(10, 9, 6, 1, 300, 1, 1, '2021-07-07 06:14:10', NULL),
(11, 9, 6, 1, 300, 1, 1, '2021-07-08 01:27:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_id` int(11) NOT NULL,
  `size_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sku_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `istrending` int(11) DEFAULT 1,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `subcategory_id`, `product_name`, `product_description`, `product_image`, `color_id`, `size_id`, `price`, `sku_id`, `quantity`, `istrending`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'thumb U.S. Polo Assn. Full Sleeve Plain T-Shirts for Men', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/products/60d477169d137.jpg', 5, 'M', 200, 'mag209_prod1', 10, 1, 1, '2021-06-24 05:26:14', '2021-06-24 06:52:11'),
(2, 3, 1, 'India Polo Assn. Full Sleeve Plain T-Shirts for Men', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/products/60d571ad938dd.jpg', 3, 'XL', 250, 'mag209_prod2', 10, 1, 1, '2021-06-25 00:33:25', '2021-06-25 00:34:51'),
(3, 3, 1, 'Australian Polo Assn. Full Sleeve Plain T-Shirts for Men', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/products/60d577f55d19d.jpg', 2, 'L', 500, 'mag209_prod3', 10, 1, 1, '2021-06-25 01:00:13', NULL),
(4, 2, 4, 'Woven Kanjivaram Silk Blend Saree  (Beige)', 'Mehrang offers high-quality Sarees online at affordable rates. We bring to you the latest collection every month and we believe in constant innovation and creativity. Mehrang Designs will serve all your needs for Silk Saree, Banarasi Saree, Kanjeevaram Saree, Plain Saree, Woven Saree, Georgette Saree, Crepe Saree, Designer Saree and many more. We change our collection with the trend and as per our customers demand. Mehrang is in line with serving marvellous Sarees with the hottest trend this season. The Saree is paired with an unstitched blouse in the same fabric as the saree. These saris are easy to handle', 'image/products/60d87dfa4acdf.jpeg', 6, 'L', 1260, 'SKU_TUSAR_CREAM', 10, 1, 1, '2021-06-27 08:02:42', NULL),
(5, 2, 3, 'Crepe Solid, Floral Print, Printed Salwar Suit Material', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'image/products/60d87f9ae9746.jpeg', 2, 'L', 500, 'mag209_prod4', 10, 1, 1, '2021-06-27 08:09:38', NULL),
(6, 4, 7, 'Boys Festive & Party Kurta and Pyjama Set', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'image/products/60d88192858da.jpeg', 4, 'S', 120, 'mag209_prod6', 10, 1, 1, '2021-06-27 08:18:02', NULL),
(7, 3, 1, 'U.K. Polo Assn. Full Sleeve Plain T-Shirts for Men', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/products/60dc33439c5a7.jpg', 5, 'M', 500, 'mag209_prod7', 8, 1, 1, '2021-06-30 03:32:59', NULL),
(8, 3, 1, 'India Polo', 'abxgcjhkhj fdghkl', 'image/products/60dc3630d051b.jpg', 1, 'L', 500, 'mag209_prod9', 10, NULL, 1, '2021-06-30 03:45:28', NULL),
(9, 3, 2, 'thumb thumb U.S. Polo Assn. Full Sleeve Plain Shirts for Men', 'this issdfvgn sdfnm  jbxsc sdfjvc ccdvc  dfbbgnh bn,sdkv', 'image/products/60dd5411871ac.jpeg', 1, 'L', 300, 'mag209_prod11', 7, 1, 1, '2021-07-01 00:05:13', NULL),
(10, 3, 5, 'thumb U.S. Polo Assn. Full Sleeve Plain T-Shirts for Jabhha', 'sdfgn  dsfghjm, dscdvfbnm, adsfghjk sdfghjk sdfghnm', 'image/products/60dd5513a8019.jpg', 6, 'M', 700, 'SKU_TUSAR_CREAM1', 5, 1, 1, '2021-07-01 00:09:31', NULL),
(11, 3, 2, 'thumb U.S. Polo Assn. Full Sleeve Plain Shirts for Men', 'abcdfghijklmnopqrstuvwxyz agshdjfkglh/; lkjhgdfsdfgnhjmk, kyjhgfssghjk hgsfdfghjhkl kjhgfdafghjkjl kjhgfdasadfdgfhj kjhgfdfgj', 'image/products/60dd89206fa46.jpg', 5, 'L,M', 1000, 'SKU_TUSAR_CREAM', 12, 1, 1, '2021-07-01 03:51:36', '2021-07-02 01:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3a3os8RGdlcZ6liOWguD8X85z1ffEBuYAFVnR0Lc', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiTjh2cmlLc1pBbUtmRXIxRWx1azRjbTJVSW1xQkVPZFBvUXFKTU1RdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hbGwvb3JkZXIiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6MTc6InBhc3N3b3JkX2hhc2hfd2ViIjtzOjYwOiIkMnkkMTAkdG5YUy85OXpXTDh1dVdtNDdFVk5XZXRKWjRoQzVBRnIweXFxd1JQd0Mwa3NKRldIb0JxZnEiO3M6MjE6InBhc3N3b3JkX2hhc2hfc2FuY3R1bSI7czo2MDoiJDJ5JDEwJHRuWFMvOTl6V0w4dXVXbTQ3RVZOV2V0Slo0aEM1QUZyMHlxcXdSUHdDMGtzSkZXSG9CcWZxIjt9', 1625662872),
('LNDLzGHPXAUHLxnkMYGPuyr2MI0O6vjDR76HO7ba', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieTN2ZDVKM01qYlVERVRaSDhibVREbGFxaDF6dExzYTJBNlZGU2hIbiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1625727085),
('pWoUmVEylw75xU0yjdsgNvYETo3c87il5fxc47jJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTkxxT3YycUNjQlZ6c2RmOWltNzN0QW94QU00OEJiZXFqTWdSNXdYViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1625662189),
('s7p8ds5UGNlR9LIBY5n98VEv6XSc71vDzAle95hG', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiQml5U2czUXExdlNwSDlIYjRNOTFtTDZ4b09WNks3OHdGaWt4NFJkRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hZGQvYWJvdXQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6MTc6InBhc3N3b3JkX2hhc2hfd2ViIjtzOjYwOiIkMnkkMTAkdG5YUy85OXpXTDh1dVdtNDdFVk5XZXRKWjRoQzVBRnIweXFxd1JQd0Mwa3NKRldIb0JxZnEiO3M6MjE6InBhc3N3b3JkX2hhc2hfc2FuY3R1bSI7czo2MDoiJDJ5JDEwJHRuWFMvOTl6V0w4dXVXbTQ3RVZOV2V0Slo0aEM1QUZyMHlxcXdSUHdDMGtzSkZXSG9CcWZxIjt9', 1625745806),
('tZ4AZVW8FJBIWon5pSp4x5a8U02UzhygHLaAwBmB', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiZnB6V05aczlpYlZ1TUc4dnNMeGltblNzd3NmWFlJa3MwdDBETVJsQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zbGlkZXIiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6MTc6InBhc3N3b3JkX2hhc2hfd2ViIjtzOjYwOiIkMnkkMTAkdG5YUy85OXpXTDh1dVdtNDdFVk5XZXRKWjRoQzVBRnIweXFxd1JQd0Mwa3NKRldIb0JxZnEiO3M6MjE6InBhc3N3b3JkX2hhc2hfc2FuY3R1bSI7czo2MDoiJDJ5JDEwJHRuWFMvOTl6V0w4dXVXbTQ3RVZOV2V0Slo0aEM1QUZyMHlxcXdSUHdDMGtzSkZXSG9CcWZxIjt9', 1625727348),
('WTgxEVeNa12TUfoicoeU0S3XbhRBq0FrNbhyBoxK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQkNBbVJjY040QnloY25NNVdyNEVERDRzc3V6aDFrREJQb1lZaHFFdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1625727088),
('xG6IhCpe5I2M3iVqLHG53ybO5HaxEsruRlCmVt9J', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTZlTmJyQ01LOTBvUUg0Q3V1OGRqZ0lncmp2dkpYeHhDSGxwb3h5SyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1625727089);

-- --------------------------------------------------------

--
-- Table structure for table `shippinginformations`
--

CREATE TABLE `shippinginformations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `country` int(11) NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shippinginformations`
--

INSERT INTO `shippinginformations` (`id`, `user_id`, `street`, `city`, `state`, `country`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(2, 6, '3060,Ubhosher,Vanmali vanka ni Pole', 1, 1, 1, 1, NULL, NULL),
(3, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(4, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(5, 17, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(6, 18, '3060,Ubhosher,Vanmali vanka ni Pole', 1, 1, 1, 1, NULL, NULL),
(7, 6, 'UBHOSHER SHAHPUR', 2, 2, 1, 1, NULL, NULL),
(8, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL),
(9, 20, 'Ubhosher', 1, 1, 1, 1, NULL, NULL),
(10, 21, '3060,Ubhosher,Vanmali vanka ni Pole', 1, 1, 1, 1, NULL, NULL),
(11, 22, 'SUgad', 1, 1, 1, 1, NULL, NULL),
(12, 6, 'UBHOSHER SHAHPUR', 1, 1, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `size_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `size_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'L', 1, '2021-06-24 03:34:44', '2021-06-24 03:36:08'),
(2, 'M', 1, '2021-06-24 03:35:51', NULL),
(3, 'S', 1, '2021-06-24 03:36:40', NULL),
(4, 'XL', 1, '2021-06-24 03:36:57', NULL),
(6, 'XXS', 1, '2021-06-27 07:38:26', NULL),
(7, 'XS', 1, '2021-06-27 07:38:49', NULL),
(8, 'XXL', 1, '2021-06-27 07:39:33', NULL),
(9, 'XXXL', 1, '2021-06-27 07:40:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'image/sliders/60e327bb3a637.jpg', NULL, NULL),
(2, 'image/sliders/60e6a172c4950.jpg', NULL, NULL),
(3, 'image/sliders/60e327d7e4778.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` int(11) NOT NULL,
  `state_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `country_id`, `state_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Gujarat', 1, '2021-06-24 11:36:48', '2021-06-24 11:47:12'),
(2, 1, 'Rajshthan', 1, '2021-06-24 11:48:11', NULL),
(3, 3, 'Melbourne', 1, '2021-06-24 11:48:38', NULL),
(4, 2, 'Karachi', 1, '2021-06-24 11:49:10', NULL),
(5, 1, 'Delhi', 1, '2021-06-24 11:49:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subcategory_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `category_id`, `subcategory_name`, `subcategory_description`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 'Tshirt', 'this is tshirt', 1, '2021-06-23 23:30:28', '2021-06-24 00:10:12'),
(2, 3, 'Shirts', 'This is shirts for men', 1, '2021-06-24 00:11:36', '2021-06-24 00:16:34'),
(3, 2, 'Dress', 'This is For women', 1, '2021-06-24 23:33:58', NULL),
(4, 2, 'Sari', 'This is Sari For women', 1, '2021-06-24 23:34:45', NULL),
(5, 3, 'Jabbhha', 'Men clothes', 1, '2021-06-25 00:24:24', NULL),
(6, 3, 'Kurtas', 'This is Kurta for men', 1, '2021-06-25 02:26:42', NULL),
(7, 4, 'Kurta', 'this is for kids', 1, '2021-06-27 08:14:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `taxamounts`
--

CREATE TABLE `taxamounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `tax_amount` int(11) NOT NULL,
  `status` tinyint(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `taxamounts`
--

INSERT INTO `taxamounts` (`id`, `country_id`, `state_id`, `tax_amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 100, 1, '2021-07-05 07:41:55', NULL),
(2, 1, 2, 200, 1, '2021-07-05 07:42:31', NULL),
(3, 1, 5, 500, 1, '2021-07-05 07:43:03', NULL),
(4, 2, 4, 1000, 1, '2021-07-05 07:43:31', NULL),
(5, 3, 3, 2000, 1, '2021-07-05 07:44:08', '2021-07-06 00:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `designation`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Nikhil Shah', 'Trainee', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/testimonials/60e2e86ad71c6.jpg', NULL, NULL),
(2, 'Vivek Chauhan', 'Student', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/testimonials/60e2e8a120465.png', NULL, NULL),
(3, 'Parth Thakkar', 'Cyclist', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/testimonials/60e2e8d424a63.jpg', NULL, NULL),
(4, 'Anjali Shah', 'C.S.', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed At Ante. Mauris Eleifend, Quam A Vulputate Dictum, Massa Quam Dapibus Leo, Eget Vulputate Orci Purus Ut Lorem. In Fringilla Mi In Ligula. Pellentesque Aliquam Quam Vel Dolor. Every Item Is A Vital Part Of A Woman\'s Wardrobe.', 'image/testimonials/60e2e8fbaabf1.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `remember_token`, `current_team_id`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(1, 'Nikhil', 'admin@gmail.com', NULL, '$2y$10$tnXS/99zWL8uuWm47EVNWetJZ4hC5AFr0yqqwRPwC0ksJFWHoBqfq', NULL, NULL, 'T39VDC4GtcmQTTMfvYzEtLU02t3hxwhcrDetk6pNWND5j8wGq5HQznCxrH7G', NULL, NULL, '2021-06-23 04:10:15', '2021-06-30 01:31:00');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 6, 9, '2021-07-05 02:47:58', NULL),
(2, 6, 9, '2021-07-05 03:05:48', NULL),
(3, 6, 9, '2021-07-06 01:11:40', NULL),
(4, 6, 9, '2021-07-06 01:11:43', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billinginformations`
--
ALTER TABLE `billinginformations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `frontusers`
--
ALTER TABLE `frontusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletterusers`
--
ALTER TABLE `newsletterusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shippinginformations`
--
ALTER TABLE `shippinginformations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxamounts`
--
ALTER TABLE `taxamounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `billinginformations`
--
ALTER TABLE `billinginformations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `frontusers`
--
ALTER TABLE `frontusers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `newsletterusers`
--
ALTER TABLE `newsletterusers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `shippinginformations`
--
ALTER TABLE `shippinginformations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `taxamounts`
--
ALTER TABLE `taxamounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
