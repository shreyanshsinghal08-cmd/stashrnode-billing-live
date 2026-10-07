-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: paymenter
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_keys`
--

DROP TABLE IF EXISTS `api_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_keys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `permissions` json DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `ip_addresses` json DEFAULT NULL,
  `last_used_at` datetime DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_keys_token_unique` (`token`),
  KEY `api_keys_user_id_foreign` (`user_id`),
  CONSTRAINT `api_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_keys`
--

LOCK TABLES `api_keys` WRITE;
/*!40000 ALTER TABLE `api_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `changes` json DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_logs_model_type_model_id_index` (`model_type`,`model_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audits`
--

DROP TABLE IF EXISTS `audits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `event` varchar(255) NOT NULL,
  `auditable_type` varchar(255) NOT NULL,
  `auditable_id` bigint unsigned NOT NULL,
  `old_values` text,
  `new_values` text,
  `url` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(1023) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audits_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`),
  KEY `audits_user_id_user_type_index` (`user_id`,`user_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audits`
--

LOCK TABLES `audits` WRITE;
/*!40000 ALTER TABLE `audits` DISABLE KEYS */;
INSERT INTO `audits` VALUES (1,NULL,NULL,'created','App\\Models\\User',1,'[]','{\"first_name\":\"shreyansh\",\"last_name\":\"singhal\",\"email\":\"shreyanshsinghal08@gmail.com\",\"password\":\"$2y$12$6jlhNr2rDkXBb\\/Nd6i5W.ONxP5axNXDVKikqyuY3bT33IOA4L1GlC\",\"id\":1}','http://localhost/paymenter/public/register','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36',NULL,'2026-10-03 06:49:15','2026-10-03 06:49:15');
/*!40000 ALTER TABLE `audits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing_agreements`
--

DROP TABLE IF EXISTS `billing_agreements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_agreements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ulid` char(26) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `gateway_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `expiry` date DEFAULT NULL,
  `external_reference` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `billing_agreements_ulid_unique` (`ulid`),
  UNIQUE KEY `billing_agreements_external_reference_unique` (`external_reference`),
  KEY `billing_agreements_user_id_foreign` (`user_id`),
  KEY `billing_agreements_gateway_id_foreign` (`gateway_id`),
  CONSTRAINT `billing_agreements_gateway_id_foreign` FOREIGN KEY (`gateway_id`) REFERENCES `extensions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `billing_agreements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_agreements`
--

LOCK TABLES `billing_agreements` WRITE;
/*!40000 ALTER TABLE `billing_agreements` DISABLE KEYS */;
/*!40000 ALTER TABLE `billing_agreements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `plan_id` bigint unsigned DEFAULT NULL,
  `config_options` json DEFAULT NULL,
  `checkout_config` json DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_cart_id_foreign` (`cart_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_plan_id_foreign` (`plan_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ulid` char(26) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `coupon_id` bigint unsigned DEFAULT NULL,
  `currency_code` varchar(3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carts_ulid_unique` (`ulid`),
  KEY `carts_user_id_foreign` (`user_id`),
  KEY `carts_coupon_id_foreign` (`coupon_id`),
  CONSTRAINT `carts_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `parent_id` bigint unsigned DEFAULT NULL,
  `full_slug` text,
  `sort` tinyint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config_option_products`
--

DROP TABLE IF EXISTS `config_option_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config_option_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `config_option_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `config_option_products_config_option_id_foreign` (`config_option_id`),
  KEY `config_option_products_product_id_foreign` (`product_id`),
  CONSTRAINT `config_option_products_config_option_id_foreign` FOREIGN KEY (`config_option_id`) REFERENCES `config_options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `config_option_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_option_products`
--

LOCK TABLES `config_option_products` WRITE;
/*!40000 ALTER TABLE `config_option_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `config_option_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config_options`
--

DROP TABLE IF EXISTS `config_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `env_variable` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sort` tinyint unsigned DEFAULT NULL,
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `upgradable` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `parent_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `config_options_parent_id_foreign` (`parent_id`),
  CONSTRAINT `config_options_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `config_options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_options`
--

LOCK TABLES `config_options` WRITE;
/*!40000 ALTER TABLE `config_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `config_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_products`
--

DROP TABLE IF EXISTS `coupon_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `coupon_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `coupon_products_coupon_id_foreign` (`coupon_id`),
  KEY `coupon_products_product_id_foreign` (`product_id`),
  CONSTRAINT `coupon_products_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `coupon_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_products`
--

LOCK TABLES `coupon_products` WRITE;
/*!40000 ALTER TABLE `coupon_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `applies_to` varchar(255) NOT NULL DEFAULT 'all',
  `recurring` int DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `value` decimal(17,2) DEFAULT NULL,
  `max_uses` int DEFAULT NULL,
  `max_uses_per_user` int DEFAULT NULL,
  `starts_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credits`
--

DROP TABLE IF EXISTS `credits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `currency_code` varchar(3) NOT NULL,
  `amount` decimal(17,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `credits_user_id_foreign` (`user_id`),
  CONSTRAINT `credits_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credits`
--

LOCK TABLES `credits` WRITE;
/*!40000 ALTER TABLE `credits` DISABLE KEYS */;
/*!40000 ALTER TABLE `credits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cron_stats`
--

DROP TABLE IF EXISTS `cron_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_stats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` int NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cron_stats_date_index` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cron_stats`
--

LOCK TABLES `cron_stats` WRITE;
/*!40000 ALTER TABLE `cron_stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `cron_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currencies` (
  `code` varchar(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `suffix` varchar(255) DEFAULT NULL,
  `format` enum('1.000,00','1,000.00','1 000,00','1 000.00') NOT NULL DEFAULT '1.000,00',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES ('USD','US Dollar','$','','1,000.00');
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_properties`
--

DROP TABLE IF EXISTS `custom_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_properties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `key` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `validation` varchar(255) DEFAULT NULL,
  `allowed_values` json DEFAULT NULL,
  `non_editable` tinyint(1) NOT NULL,
  `required` tinyint(1) NOT NULL,
  `show_on_invoice` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `custom_properties_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_properties`
--

LOCK TABLES `custom_properties` WRITE;
/*!40000 ALTER TABLE `custom_properties` DISABLE KEYS */;
INSERT INTO `custom_properties` VALUES (1,'Phone',NULL,'phone','string','App\\Models\\User','string|max:255',NULL,0,1,0),(2,'Company Name',NULL,'company_name','string','App\\Models\\User','string|max:255',NULL,0,0,1),(3,'Address',NULL,'address','string','App\\Models\\User','string|max:255',NULL,0,1,1),(4,'Address 2',NULL,'address2','string','App\\Models\\User','string|max:255',NULL,0,0,0),(5,'City',NULL,'city','string','App\\Models\\User','string|max:255',NULL,0,1,1),(6,'State',NULL,'state','string','App\\Models\\User','string|max:255',NULL,0,1,1),(7,'ZIP',NULL,'zip','string','App\\Models\\User','string|max:255',NULL,0,1,1),(8,'Country',NULL,'country','select','App\\Models\\User','string|max:255','[\"Afghanistan\", \"Aland Islands\", \"Albania\", \"Algeria\", \"American Samoa\", \"Andorra\", \"Angola\", \"Anguilla\", \"Antarctica\", \"Antigua And Barbuda\", \"Argentina\", \"Armenia\", \"Aruba\", \"Australia\", \"Austria\", \"Azerbaijan\", \"Bahamas\", \"Bahrain\", \"Bangladesh\", \"Barbados\", \"Belarus\", \"Belgium\", \"Belize\", \"Benin\", \"Bermuda\", \"Bhutan\", \"Bolivia\", \"Bosnia And Herzegovina\", \"Botswana\", \"Brazil\", \"British Indian Ocean Territory\", \"Brunei Darussalam\", \"Bulgaria\", \"Burkina Faso\", \"Burundi\", \"Cambodia\", \"Cameroon\", \"Canada\", \"Canary Islands\", \"Cape Verde\", \"Cayman Islands\", \"Central African Republic\", \"Chad\", \"Chile\", \"China\", \"Christmas Island\", \"Cocos (Keeling) Islands\", \"Colombia\", \"Comoros\", \"Congo\", \"Congo, Democratic Republic\", \"Cook Islands\", \"Costa Rica\", \"Cote D\'Ivoire\", \"Croatia\", \"Cuba\", \"Curacao\", \"Cyprus\", \"Czech Republic\", \"Denmark\", \"Djibouti\", \"Dominica\", \"Dominican Republic\", \"Ecuador\", \"Egypt\", \"El Salvador\", \"Equatorial Guinea\", \"Eritrea\", \"Estonia\", \"Ethiopia\", \"Falkland Islands (Malvinas)\", \"Faroe Islands\", \"Fiji\", \"Finland\", \"France\", \"French Guiana\", \"French Polynesia\", \"French Southern Territories\", \"Gabon\", \"Gambia\", \"Georgia\", \"Germany\", \"Ghana\", \"Gibraltar\", \"Greece\", \"Greenland\", \"Grenada\", \"Guadeloupe\", \"Guam\", \"Guatemala\", \"Guernsey\", \"Guinea\", \"Guinea-Bissau\", \"Guyana\", \"Haiti\", \"Heard Island & Mcdonald Islands\", \"Holy See (Vatican City State)\", \"Honduras\", \"Hong Kong\", \"Hungary\", \"Iceland\", \"India\", \"Indonesia\", \"Iran, Islamic Republic Of\", \"Iraq\", \"Ireland\", \"Isle Of Man\", \"Israel\", \"Italy\", \"Jamaica\", \"Japan\", \"Jersey\", \"Jordan\", \"Kazakhstan\", \"Kenya\", \"Kiribati\", \"Korea\", \"Kosovo\", \"Kuwait\", \"Kyrgyzstan\", \"Lao People\'s Democratic Republic\", \"Latvia\", \"Lebanon\", \"Lesotho\", \"Liberia\", \"Libyan Arab Jamahiriya\", \"Liechtenstein\", \"Lithuania\", \"Luxembourg\", \"Macao\", \"Macedonia\", \"Madagascar\", \"Malawi\", \"Malaysia\", \"Maldives\", \"Mali\", \"Malta\", \"Marshall Islands\", \"Martinique\", \"Mauritania\", \"Mauritius\", \"Mayotte\", \"Mexico\", \"Micronesia, Federated States Of\", \"Moldova\", \"Monaco\", \"Mongolia\", \"Montenegro\", \"Montserrat\", \"Morocco\", \"Mozambique\", \"Myanmar\", \"Namibia\", \"Nauru\", \"Nepal\", \"Netherlands\", \"Netherlands Antilles\", \"New Caledonia\", \"New Zealand\", \"Nicaragua\", \"Niger\", \"Nigeria\", \"Niue\", \"Norfolk Island\", \"Northern Mariana Islands\", \"Norway\", \"Oman\", \"Pakistan\", \"Palau\", \"Palestine, State of\", \"Panama\", \"Papua New Guinea\", \"Paraguay\", \"Peru\", \"Philippines\", \"Pitcairn\", \"Poland\", \"Portugal\", \"Puerto Rico\", \"Qatar\", \"Reunion\", \"Romania\", \"Russian Federation\", \"Rwanda\", \"Saint Barthelemy\", \"Saint Helena\", \"Saint Kitts And Nevis\", \"Saint Lucia\", \"Saint Martin\", \"Saint Pierre And Miquelon\", \"Saint Vincent And Grenadines\", \"Samoa\", \"San Marino\", \"Sao Tome And Principe\", \"Saudi Arabia\", \"Senegal\", \"Serbia\", \"Seychelles\", \"Sierra Leone\", \"Singapore\", \"Slovakia\", \"Slovenia\", \"Solomon Islands\", \"Somalia\", \"South Africa\", \"South Georgia And Sandwich Isl.\", \"Spain\", \"Sri Lanka\", \"Sudan\", \"South Sudan\", \"Suriname\", \"Svalbard And Jan Mayen\", \"Swaziland\", \"Sweden\", \"Switzerland\", \"Syrian Arab Republic\", \"Taiwan\", \"Tajikistan\", \"Tanzania\", \"Thailand\", \"Timor-Leste\", \"Togo\", \"Tokelau\", \"Tonga\", \"Trinidad And Tobago\", \"Tunisia\", \"Turkey\", \"Turkmenistan\", \"Turks And Caicos Islands\", \"Tuvalu\", \"Uganda\", \"Ukraine\", \"United Arab Emirates\", \"United Kingdom\", \"United States\", \"United States Outlying Islands\", \"Uruguay\", \"Uzbekistan\", \"Vanuatu\", \"Venezuela\", \"Viet Nam\", \"Virgin Islands, British\", \"Virgin Islands, U.S.\", \"Wallis And Futuna\", \"Western Sahara\", \"Yemen\", \"Zambia\", \"Zimbabwe\"]',0,1,1);
/*!40000 ALTER TABLE `custom_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debug_logs`
--

DROP TABLE IF EXISTS `debug_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debug_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `context` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debug_logs`
--

LOCK TABLES `debug_logs` WRITE;
/*!40000 ALTER TABLE `debug_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `debug_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_logs`
--

DROP TABLE IF EXISTS `email_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `body` longtext NOT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `error` text,
  `job_uuid` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_logs_user_id_foreign` (`user_id`),
  CONSTRAINT `email_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_logs`
--

LOCK TABLES `email_logs` WRITE;
/*!40000 ALTER TABLE `email_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extensions`
--

DROP TABLE IF EXISTS `extensions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extensions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_extension_type` (`extension`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extensions`
--

LOCK TABLES `extensions` WRITE;
/*!40000 ALTER TABLE `extensions` DISABLE KEYS */;
INSERT INTO `extensions` VALUES (4,'Razorpay','Razorpay','gateway',1,'2026-10-04 08:24:22','2026-10-04 08:24:22',NULL);
/*!40000 ALTER TABLE `extensions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `price` decimal(17,2) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `reference_type` varchar(255) DEFAULT NULL,
  `reference_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_items_invoice_id_foreign` (`invoice_id`),
  KEY `invoice_items_reference_type_reference_id_index` (`reference_type`,`reference_id`),
  CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_snapshots`
--

DROP TABLE IF EXISTS `invoice_snapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_snapshots` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `tax_name` varchar(255) DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT NULL,
  `tax_country` varchar(255) DEFAULT NULL,
  `bill_to` text,
  `invoice_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_snapshots_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_snapshots_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_snapshots`
--

LOCK TABLES `invoice_snapshots` WRITE;
/*!40000 ALTER TABLE `invoice_snapshots` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_snapshots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_transactions`
--

DROP TABLE IF EXISTS `invoice_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `gateway_id` bigint unsigned DEFAULT NULL,
  `amount` decimal(17,2) NOT NULL,
  `fee` decimal(17,2) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'succeeded',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_credit_transaction` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `invoice_transactions_invoice_id_foreign` (`invoice_id`),
  KEY `invoice_transactions_gateway_id_foreign` (`gateway_id`),
  CONSTRAINT `invoice_transactions_gateway_id_foreign` FOREIGN KEY (`gateway_id`) REFERENCES `extensions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `invoice_transactions_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_transactions`
--

LOCK TABLES `invoice_transactions` WRITE;
/*!40000 ALTER TABLE `invoice_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `due_at` date DEFAULT NULL,
  `currency_code` varchar(3) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoices_number_unique` (`number`),
  KEY `invoices_user_id_foreign` (`user_id`),
  CONSTRAINT `invoices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000002_create_jobs_table',1),(2,'2024_02_15_122223_create_roles_table',1),(3,'2024_02_15_122224_create_users_table',1),(4,'2024_02_15_122225_create_settings_table',1),(5,'2024_02_15_122227_create_extensions_table',1),(6,'2024_02_15_122228_create_categories_table',1),(7,'2024_02_15_122231_create_products_table',1),(8,'2024_02_15_122232_create_currencies_table',1),(9,'2024_02_15_122233_create_plans_table',1),(10,'2024_02_15_122235_create_prices_table',1),(11,'2024_04_20_111206_create_audit_logs_table',1),(12,'2024_06_19_143154_create_config_options_table',1),(13,'2024_06_27_122914_create_config_option_products_table',1),(14,'2024_07_02_190049_create_tax_rates_table',1),(15,'2024_07_05_142906_create_coupons_table',1),(16,'2024_07_05_143848_create_orders_table',1),(17,'2024_07_05_143851_create_services_table',1),(18,'2024_07_05_143855_create_service_configs_table',1),(19,'2024_07_05_144020_create_invoices_table',1),(20,'2024_07_05_144024_create_invoice_items_table',1),(21,'2024_07_10_203119_create_invoice_transactions_table',1),(22,'2024_07_13_121420_create_coupon_products_table',1),(23,'2024_07_15_134223_create_custom_properties_table',1),(24,'2024_07_15_134515_create_properties_table',1),(25,'2024_08_09_120929_create_tickets_table',1),(26,'2024_08_09_120938_create_ticket_messages_table',1),(27,'2024_08_13_185122_create_email_templates_table',1),(28,'2024_08_22_094747_create_email_logs_table',1),(29,'2024_09_13_193832_create_oauth_auth_codes_table',1),(30,'2024_09_13_193833_create_oauth_access_tokens_table',1),(31,'2024_09_13_193834_create_oauth_refresh_tokens_table',1),(32,'2024_09_13_193835_create_oauth_clients_table',1),(33,'2024_09_13_193836_create_oauth_personal_access_clients_table',1),(34,'2024_09_16_171549_create_service_cancellations_table',1),(35,'2024_09_16_171555_create_service_upgrades_table',1),(36,'2024_09_17_111932_create_product_upgrades_table',1),(37,'2024_12_26_185218_create_credits_table',1),(38,'2025_02_24_052318_make_invoice_nullable_in_service_upgrades',1),(39,'2025_03_07_190949_create_debug_logs_table',1),(40,'2025_03_11_205629_add_hidden_to_products',1),(41,'2025_04_25_064729_add_number_to_invoices',1),(42,'2025_05_22_073500_add_max_uses_per_user_to_coupons_table',1),(43,'2025_06_04_132119_create_api_keys_table',1),(44,'2025_06_20_101701_add_upgradable_to_config_options',1),(45,'2025_06_30_092448_cascade_config_value_id_on_service_configs',1),(46,'2025_07_31_165713_create_ticket_message_attachments_table',1),(47,'2025_08_02_150516_create_ticket_mail_logs_table',1),(48,'2025_08_04_181811_add_ticket_mail_log_id_to_ticket_messages',1),(49,'2025_08_15_100111_change_gateway_id_on_invoice_transactions',1),(50,'2025_08_15_132711_create_audits_table',1),(51,'2025_09_03_190940_add_name_to_currencies',1),(52,'2025_09_12_163530_make_number_nullable_on_invoices',1),(53,'2025_09_16_130604_create_invoice_snapshots_table',1),(54,'2025_09_19_140421_create_cron_stats_table',1),(55,'2025_09_20_185200_add_applies_to_to_coupons',1),(56,'2025_09_26_102234_create_carts_table',1),(57,'2025_09_26_102237_create_cart_items_table',1),(58,'2025_09_27_182553_create_billing_agreements_table',1),(59,'2025_09_29_100814_add_deleted_at_to_extensions',1),(60,'2025_09_29_113738_add_billing_agreement_id_to_services',1),(61,'2025_09_30_100549_add_status_to_invoice_transactions',1),(62,'2025_10_04_183152_rename_email_templates_to_notification_templates_table',1),(63,'2025_10_06_161337_create_notification_preferences_table',1),(64,'2025_10_07_195108_create_notification_subscriptions_table',1),(65,'2025_10_08_193743_create_notifications_table',1),(66,'2025_10_14_140749_add_is_credit_transaction_to_invoice_transactions',1),(67,'2025_10_27_210931_create_user_authentication_logs_table',1),(68,'2025_11_02_103925_add_description_to_config_options_table',1),(69,'2025_12_13_125749_create_user_sessions_table',1),(70,'2025_12_15_205656_drop_remember_token_from_users',1),(71,'2025_12_17_125349_add_label_to_services',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_preferences`
--

DROP TABLE IF EXISTS `notification_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_preferences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `notification_template_id` bigint unsigned NOT NULL,
  `mail_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `in_app_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notification_preferences_user_id_foreign` (`user_id`),
  KEY `notification_preferences_notification_template_id_foreign` (`notification_template_id`),
  CONSTRAINT `notification_preferences_notification_template_id_foreign` FOREIGN KEY (`notification_template_id`) REFERENCES `notification_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notification_preferences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_preferences`
--

LOCK TABLES `notification_preferences` WRITE;
/*!40000 ALTER TABLE `notification_preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_subscriptions`
--

DROP TABLE IF EXISTS `notification_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_subscriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `p256dh_key` text NOT NULL,
  `auth_key` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_subscriptions_endpoint_unique` (`endpoint`),
  KEY `notification_subscriptions_user_id_foreign` (`user_id`),
  CONSTRAINT `notification_subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_subscriptions`
--

LOCK TABLES `notification_subscriptions` WRITE;
/*!40000 ALTER TABLE `notification_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_templates`
--

DROP TABLE IF EXISTS `notification_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_templates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `in_app_title` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `mail_enabled` enum('force','choice_on','choice_off','never') NOT NULL DEFAULT 'choice_on',
  `in_app_enabled` enum('force','choice_on','choice_off','never') NOT NULL DEFAULT 'choice_on',
  `body` text NOT NULL,
  `in_app_body` text,
  `edit_preference_message` varchar(255) DEFAULT NULL,
  `in_app_url` varchar(255) DEFAULT NULL,
  `cc` json DEFAULT NULL,
  `bcc` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_templates_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_templates`
--

LOCK TABLES `notification_templates` WRITE;
/*!40000 ALTER TABLE `notification_templates` DISABLE KEYS */;
INSERT INTO `notification_templates` VALUES (1,'new_login_detected','New login detected','New login detected',1,'force','choice_off','# New login detected  \n            \nA new login was detected on your account.\n            \n- IP: {{ $ip }}  \n- Device: {{ $device }}\n- Time: {{ $time }}\n\n**If this was you**  \nYou can ignore this message, there is no need to take any action.\n            \n**If this wasn\'t you**  \nPlease reset your password [here]({{ route(\'password.request\') }}).','A new login was detected on your account from IP: {{ $ip }} using {{ $device }} at {{ $time }}.','Alert me about new login attempts','{{ route(\"profile.security\") }}',NULL,NULL,NULL,NULL),(2,'new_invoice_created','New invoice created','New invoice created',1,'choice_on','choice_on','# New invoice created  \n            \nA new invoice was created on your account.\n            \nTotal amount: **{{ $total }}**\n            \n            \n<div class=\"table\">  \n            \n|   Item   | Quantity |  Price   |  \n| :------: | :------: | :------: |\n@foreach ($items as $item)\n| {{ $item->description }} | {{ $item->quantity }} | {{ $item->price }} |\n@endforeach\n</div>\n            \n<div class=\"action\">\n	<a class=\"button button-blue\" href=\"{{ route(\'invoices.show\', $invoice) }}\">\n		Go to invoice\n	</a>\n</div>\n            \n@if($has_subscription)\nYou have a active subscription, the invoice will be automatically paid.\n@endif','A new invoice was created on your account with total amount: {{ $total }}.','Notify me about new invoices','{{ route(\"invoices.show\", $invoice) }}',NULL,NULL,NULL,NULL),(3,'invoice_paid','Invoice paid','Invoice paid',1,'choice_on','choice_on','# Invoice paid  \n            \nYour invoice has been successfully paid.\n            \nTotal amount: **{{ $invoice->formattedTotal }}**\n            \nYou can view your invoice details by clicking the button below.\n            \n<div class=\"action\">\n	<a class=\"button button-blue\" href=\"{{ route(\'invoices.show\', $invoice) }}\">\n		View Invoice\n	</a>\n</div>','Your invoice #{{ $invoice->id }} has been successfully paid with total amount: {{ $invoice->formattedTotal }}.','Notify me about successful payments','{{ route(\"invoices.show\", $invoice) }}',NULL,NULL,NULL,NULL),(4,'invoice_payment_failed','Invoice payment failed','Invoice payment failed',1,'choice_on','choice_on','# Invoice payment failed  \n\nYour invoice payment has failed.\n\nTotal amount: **{{ $invoice->formattedTotal }}**\n            \nPlease pay the invoice to avoid service interruptions.\n            \n<div class=\"action\">\n	<a class=\"button button-blue\" href=\"{{ route(\'invoices.show\', $invoice) }}\">\n		Pay Invoice\n	</a>\n</div>','Your invoice #{{ $invoice->id }} payment has failed. Please pay the invoice to avoid service interruptions.','Alert me about payment failures','{{ route(\"invoices.show\", $invoice) }}',NULL,NULL,NULL,NULL),(5,'new_order_created','New order created','New order created',1,'choice_on','choice_on','# New order created\n\nA new order was created on your account.\n\n**Order details**\n<div class=\"table\">  \n            \n|   Item   | Quantity |  Price   |  \n| :------: | :------: | :------: |\n@foreach ($items as $item)\n| {{ $item->product->name }} | {{ $item->quantity }} | {{ $item->formattedPrice }} |\n@endforeach\n</div>','A new order was created on your account.','Send me order confirmations','{{ route(\"services\") }}',NULL,NULL,NULL,NULL),(6,'new_server_created','Service activated','Service activated',1,'force','choice_on','# Service activated\n\nYour service has been activated.\n\n**Service details**\n- Name: {{ $service->product->name }}\n\n@isset($service->product->email_template)\n**Service information**  \n{!! Str::markdown(Illuminate\\View\\Compilers\\BladeCompiler::render($service->product->email_template, get_defined_vars()[\'__data\'])) !!}\n@endisset','Your service {{ $service->product->name }} has been activated.','Notify me about new service activations','{{ route(\"services.show\", $service) }}',NULL,NULL,NULL,NULL),(7,'server_suspended','Service suspended','Service suspended',1,'force','choice_on','# Service suspended\n\nYour service has been suspended due to a payment failure.\n\n**Service details**\n- Name: {{ $service->product->name }}\n\nPlease pay the invoice to reactivate the service.','Your service {{ $service->product->name }} has been suspended due to a payment failure. Please pay the invoice to reactivate the service.','Alert me about service suspensions','{{ route(\"services.show\", $service) }}',NULL,NULL,NULL,NULL),(8,'server_terminated','Service terminated','Server terminated',1,'force','choice_on','# Service terminated\n\nYour service has been terminated.\n\n**Service details**\n- Name: {{ $service->product->name }}\n\nDo you consider it a mistake?\n<div class=\"action\">\n	<a class=\"button button-blue\" href=\"{{ route(\'tickets.create\') }}\">\n		Contact us\n	</a>\n</div>','Your server {{ $service->product->name }} has been terminated.','Alert me about service terminations','{{ route(\"services.show\", $service) }}',NULL,NULL,NULL,NULL),(9,'new_ticket_message','[Ticket #{{ $ticketMessage->ticket_id }}] New reply','New ticket reply',1,'choice_on','choice_on','# New ticket reply\n\n{{ $ticketMessage->user->name }} replied to your ticket.\n\n**Message**\n{!! Str::markdown($ticketMessage->message, [\n    \'html_input\' => \'strip\',\n    \'allow_unsafe_links\' => false,\n]) !!}','You have a new reply on your ticket #{{ $ticketMessage->ticket_id }}.','Notify me about ticket replies','{{ route(\"tickets.show\", $ticketMessage->ticket_id) }}',NULL,NULL,NULL,NULL),(10,'email_verification','Email verification',NULL,1,'force','never','# Email verification\nPlease verify your email address by clicking the link below.\n<div class=\"action\">\n    <a class=\"button button-blue\" href=\"{{ $url }}\">\n        Verify email\n    </a>\n</div>\nThis link will expire in 60 minutes.\nIf you did not create an account, you can ignore this email.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'password_reset','Password reset',NULL,1,'force','never','# Password reset\nYou are receiving this email because we received a password reset request for your account.\n\n**Reset password**\n<div class=\"action\">\n	<a class=\"button button-blue\" href=\"{{ $url }}\">\n		Reset password\n	</a>\n</div>\n\nThis password reset link will expire in 60 minutes.\n\nIf you did not request a password reset, no further action is required.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'service_cancellation_received','Service cancellation received','Service cancellation received',1,'choice_on','choice_on','# Server Cancellation Received\n\nWe\'re sorry to see you go! Your server cancellation has been successfully received.\n\n**Cancellation Details**\n- Server: {{ $service->product->name }}\n@if($cancellation->reason)\n- Reason: {{ $cancellation->reason }}\n@endif\n- Requested at: {{ $cancellation->created_at->format(\'F j, Y, g:i A\') }}\n\n@if($cancellation->type === \'end_of_period\')\nYour server will remain active until {{ $service->expires_at->format(\'F j, Y\') }} (end of your current billing period).\n@else\nYour server has been terminated immediately.\n@endif\n','Your server cancellation has been successfully received.','Notify me about service cancellations','{{ route(\"services.show\", $service) }}',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `notification_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `show_in_app` tinyint(1) NOT NULL DEFAULT '1',
  `show_as_push` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_foreign` (`user_id`),
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `client_id` char(36) NOT NULL,
  `scopes` text,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` char(36) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `currency_code` varchar(3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `priceable_type` varchar(255) NOT NULL,
  `priceable_id` bigint unsigned NOT NULL,
  `type` enum('free','one-time','recurring') NOT NULL,
  `billing_period` int DEFAULT NULL,
  `billing_unit` enum('hour','day','week','month','year') DEFAULT NULL,
  `sort` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_priceable_type_priceable_id_index` (`priceable_type`,`priceable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(17,2) DEFAULT NULL,
  `setup_fee` decimal(17,2) DEFAULT NULL,
  `currency_code` varchar(3) NOT NULL,
  `plan_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_upgrades`
--

DROP TABLE IF EXISTS `product_upgrades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_upgrades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `upgrade_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_upgrades_product_id_foreign` (`product_id`),
  KEY `product_upgrades_upgrade_id_foreign` (`upgrade_id`),
  CONSTRAINT `product_upgrades_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_upgrades_upgrade_id_foreign` FOREIGN KEY (`upgrade_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_upgrades`
--

LOCK TABLES `product_upgrades` WRITE;
/*!40000 ALTER TABLE `product_upgrades` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_upgrades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text,
  `stock` int DEFAULT NULL,
  `per_user_limit` int DEFAULT NULL,
  `sort` tinyint unsigned DEFAULT NULL,
  `allow_quantity` enum('disabled','separated','combined') NOT NULL DEFAULT 'disabled',
  `server_id` bigint unsigned DEFAULT NULL,
  `email_template` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `custom_property_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `properties_key_model_id_model_type_unique` (`key`,`model_id`,`model_type`),
  KEY `properties_custom_property_id_foreign` (`custom_property_id`),
  KEY `properties_model_type_model_id_index` (`model_type`,`model_id`),
  CONSTRAINT `properties_custom_property_id_foreign` FOREIGN KEY (`custom_property_id`) REFERENCES `custom_properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,1,'Phone','phone','8302589297','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15'),(2,2,'Company Name','company_name','webfluxdesign.in','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15'),(3,3,'Address','address','Tulsivan road','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15'),(4,5,'City','city','Bari','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15'),(5,6,'State','state','Rajasthan','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15'),(6,7,'ZIP','zip','328021','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15'),(7,8,'Country','country','India','App\\Models\\User',1,'2026-10-03 06:49:15','2026-10-03 06:49:15');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `permissions` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','[\"*\"]','2026-10-03 03:20:37','2026-10-03 03:20:37');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_cancellations`
--

DROP TABLE IF EXISTS `service_cancellations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_cancellations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint unsigned NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `type` enum('immediate','end_of_period') NOT NULL DEFAULT 'immediate',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_cancellations_service_id_foreign` (`service_id`),
  CONSTRAINT `service_cancellations_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_cancellations`
--

LOCK TABLES `service_cancellations` WRITE;
/*!40000 ALTER TABLE `service_cancellations` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_cancellations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_configs`
--

DROP TABLE IF EXISTS `service_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_configs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `configurable_type` varchar(255) NOT NULL,
  `configurable_id` bigint unsigned NOT NULL,
  `config_option_id` bigint unsigned NOT NULL,
  `config_value_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_configs_configurable_type_configurable_id_index` (`configurable_type`,`configurable_id`),
  KEY `service_configs_config_option_id_foreign` (`config_option_id`),
  KEY `service_configs_config_value_id_foreign` (`config_value_id`),
  CONSTRAINT `service_configs_config_option_id_foreign` FOREIGN KEY (`config_option_id`) REFERENCES `config_options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `service_configs_config_value_id_foreign` FOREIGN KEY (`config_value_id`) REFERENCES `config_options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_configs`
--

LOCK TABLES `service_configs` WRITE;
/*!40000 ALTER TABLE `service_configs` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_upgrades`
--

DROP TABLE IF EXISTS `service_upgrades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_upgrades` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint unsigned NOT NULL,
  `plan_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `invoice_id` bigint unsigned DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `type` varchar(255) NOT NULL DEFAULT 'product',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_upgrades_service_id_foreign` (`service_id`),
  KEY `service_upgrades_plan_id_foreign` (`plan_id`),
  KEY `service_upgrades_product_id_foreign` (`product_id`),
  KEY `service_upgrades_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `service_upgrades_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `service_upgrades_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `service_upgrades_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `service_upgrades_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_upgrades`
--

LOCK TABLES `service_upgrades` WRITE;
/*!40000 ALTER TABLE `service_upgrades` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_upgrades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `order_id` bigint unsigned DEFAULT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `currency_code` varchar(3) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(17,2) NOT NULL,
  `plan_id` bigint unsigned DEFAULT NULL,
  `coupon_id` bigint unsigned DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `subscription_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `billing_agreement_id` bigint unsigned DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `services_order_id_foreign` (`order_id`),
  KEY `services_product_id_foreign` (`product_id`),
  KEY `services_user_id_foreign` (`user_id`),
  KEY `services_plan_id_foreign` (`plan_id`),
  KEY `services_coupon_id_foreign` (`coupon_id`),
  KEY `services_billing_agreement_id_foreign` (`billing_agreement_id`),
  CONSTRAINT `services_billing_agreement_id_foreign` FOREIGN KEY (`billing_agreement_id`) REFERENCES `billing_agreements` (`id`) ON DELETE SET NULL,
  CONSTRAINT `services_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL,
  CONSTRAINT `services_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `services_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE SET NULL,
  CONSTRAINT `services_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  CONSTRAINT `services_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `payload` longtext NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text,
  `type` varchar(255) NOT NULL DEFAULT 'string',
  `encrypted` tinyint(1) NOT NULL DEFAULT '0',
  `settingable_type` varchar(255) DEFAULT NULL,
  `settingable_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_settingable_id_settingable_type_unique` (`key`,`settingable_id`,`settingable_type`),
  KEY `settings_settingable_type_settingable_id_index` (`settingable_type`,`settingable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'invoice_number','0','string',0,NULL,NULL,'2026-10-03 03:20:34','2026-10-03 03:20:34'),(2,'company_name','StashrNode','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:24:44'),(3,'timezone','UTC','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(4,'app_language','en','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(5,'allowed_languages','[\"ar\",\"bn\",\"da\",\"de\",\"en\",\"es\",\"fi\",\"fr\",\"he\",\"hi\",\"hu\",\"id\",\"it\",\"ko\",\"lv\",\"nl\",\"no\",\"pl\",\"pt\",\"sr\",\"sv\",\"tr\",\"uk\",\"zh\"]','array',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(6,'app_url','http://localhost/paymenter/public','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:24:44'),(7,'captcha','disabled','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(8,'session_validation','none','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(9,'oauth_google','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(10,'oauth_github','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(11,'oauth_discord','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(12,'tax_enabled','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(13,'tax_type','inclusive','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(14,'mail_disable','1','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(15,'mail_must_verify','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(16,'mail_encryption','tls','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(17,'mail_header','<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n<title>{{ config(\'app.name\') }}</title>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n<meta name=\"color-scheme\" content=\"light\">\n<meta name=\"supported-color-schemes\" content=\"light\">\n<style>\n@media only screen and (max-width: 600px) {\n.inner-body {\nwidth: 100% !important;\n}\n\n.footer {\nwidth: 100% !important;\n}\n}\n\n@media only screen and (max-width: 500px) {\n.button {\nwidth: 100% !important;\n}\n}\n{!! config(\'settings.mail_css\') !!}\n</style>\n</head>\n<body>\n\n<table class=\"wrapper\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n<tr>\n<td align=\"center\">\n<table class=\"content\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n@if(config(\'settings.logo\'))    \n<tr>\n<td class=\"header\">\n<a href=\"{{ url(\'/\') }}\" style=\"display: inline-block;\">\n<img src=\"{{ url(Storage::url(config(\'settings.logo\'))) }}\" class=\"logo\" alt=\"{{ config(\'app.name\') }}\">\n</a>\n</td>\n</tr>\n@endif\n\n\n<!-- Email Body -->\n<tr>\n<td class=\"body\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border: hidden !important;\">\n<table class=\"inner-body\" align=\"center\" width=\"570\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n<!-- Body content -->\n<tr>\n<td class=\"content-cell\">','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(18,'mail_footer','<tr>\n<td>\n<table class=\"footer\" align=\"center\" width=\"570\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n<tr>\n<td class=\"content-cell\" align=\"center\">\n© {{ date(\'Y\') }} {{ config(\'app.name\') }}. {{ __(\'All rights reserved.\') }}\n</td>\n</tr>\n</table>\n</td>\n</tr>\n','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(19,'mail_css','/* Base */\n\nbody,\nbody *:not(html):not(style):not(br):not(tr):not(code) {\n    box-sizing: border-box;\n    font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif,\n        \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\';\n    position: relative;\n}\n\nbody {\n    -webkit-text-size-adjust: none;\n    background-color: #ffffff;\n    color: #718096;\n    height: 100%;\n    line-height: 1.4;\n    margin: 0;\n    padding: 0;\n    width: 100% !important;\n}\n\np,\nul,\nol,\nblockquote {\n    line-height: 1.4;\n    text-align: left;\n}\n\na {\n    color: #3869d4;\n}\n\na img {\n    border: none;\n}\n\n/* Typography */\n\nh1 {\n    color: #3d4852;\n    font-size: 18px;\n    font-weight: bold;\n    margin-top: 0;\n    text-align: left;\n}\n\nh2 {\n    font-size: 16px;\n    font-weight: bold;\n    margin-top: 0;\n    text-align: left;\n}\n\nh3 {\n    font-size: 14px;\n    font-weight: bold;\n    margin-top: 0;\n    text-align: left;\n}\n\np {\n    font-size: 16px;\n    line-height: 1.5em;\n    margin-top: 0;\n    text-align: left;\n}\n\np.sub {\n    font-size: 12px;\n}\n\nimg {\n    max-width: 100%;\n}\n\n/* Layout */\n\n.wrapper {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 100%;\n    background-color: #edf2f7;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n}\n\n.content {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 100%;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n}\n\n/* Header */\n\n.header {\n    padding: 25px 0;\n    text-align: center;\n}\n\n.header a {\n    color: #3d4852;\n    font-size: 19px;\n    font-weight: bold;\n    text-decoration: none;\n}\n\n/* Logo */\n\n.logo {\n    height: 75px;\n    max-height: 75px;\n}\n\n/* Body */\n\n.body {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 100%;\n    background-color: #edf2f7;\n    border-bottom: 1px solid #edf2f7;\n    border-top: 1px solid #edf2f7;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n}\n\n.inner-body {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 570px;\n    background-color: #ffffff;\n    border-color: #e8e5ef;\n    border-radius: 2px;\n    border-width: 1px;\n    box-shadow: 0 2px 0 rgba(0, 0, 150, 0.025), 2px 4px 0 rgba(0, 0, 150, 0.015);\n    margin: 0 auto;\n    padding: 0;\n    width: 570px;\n}\n\n/* Subcopy */\n\n.subcopy {\n    border-top: 1px solid #e8e5ef;\n    margin-top: 25px;\n    padding-top: 25px;\n}\n\n.subcopy p {\n    font-size: 14px;\n}\n\n/* Footer */\n\n.footer {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 570px;\n    margin: 0 auto;\n    padding: 0;\n    text-align: center;\n    width: 570px;\n}\n\n.footer p {\n    color: #b0adc5;\n    font-size: 12px;\n    text-align: center;\n}\n\n.footer a {\n    color: #b0adc5;\n    text-decoration: underline;\n}\n\n/* Tables */\n\n.table table {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 100%;\n    margin: 30px auto;\n    width: 100%;\n}\n\n.table th {\n    border-bottom: 1px solid #edeff2;\n    margin: 0;\n    padding-bottom: 8px;\n}\n\n.table td {\n    color: #74787e;\n    font-size: 15px;\n    line-height: 18px;\n    margin: 0;\n    padding: 10px 0;\n}\n\n.content-cell {\n    max-width: 100vw;\n    padding: 32px;\n}\n\n/* Buttons */\n\n.action {\n    -premailer-cellpadding: 0;\n    -premailer-cellspacing: 0;\n    -premailer-width: 100%;\n    margin: 30px auto;\n    padding: 0;\n    text-align: center;\n    width: 100%;\n}\n\n.button {\n    -webkit-text-size-adjust: none;\n    border-radius: 4px;\n    color: #fff;\n    display: inline-block;\n    overflow: hidden;\n    text-decoration: none;\n}\n\n.button-blue,\n.button-primary {\n    background-color: #2d3748;\n    border-bottom: 8px solid #2d3748;\n    border-left: 18px solid #2d3748;\n    border-right: 18px solid #2d3748;\n    border-top: 8px solid #2d3748;\n}\n\n.button-green,\n.button-success {\n    background-color: #48bb78;\n    border-bottom: 8px solid #48bb78;\n    border-left: 18px solid #48bb78;\n    border-right: 18px solid #48bb78;\n    border-top: 8px solid #48bb78;\n}\n\n.button-red,\n.button-error {\n    background-color: #e53e3e;\n    border-bottom: 8px solid #e53e3e;\n    border-left: 18px solid #e53e3e;\n    border-right: 18px solid #e53e3e;\n    border-top: 8px solid #e53e3e;\n}\n\n/* Panels */\n\n.panel {\n    border-left: #2d3748 solid 4px;\n    margin: 21px 0;\n}\n\n.panel-content {\n    background-color: #edf2f7;\n    color: #718096;\n    padding: 16px;\n}\n\n.panel-content p {\n    color: #718096;\n}\n\n.panel-item {\n    padding: 0;\n}\n\n.panel-item p:last-of-type {\n    margin-bottom: 0;\n    padding-bottom: 0;\n}\n\n/* Utilities */\n\n.break-all {\n    word-break: break-all;\n}','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(20,'tickets_disabled','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(21,'ticket_departments','[\"Support\",\"Sales\"]','array',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(22,'ticket_client_closing_disabled','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(23,'ticket_mail_piping','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(24,'ticket_mail_port','993','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(25,'cronjob_time','00:00','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(26,'cronjob_invoice','7','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(27,'cronjob_invoice_reminder','3','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(28,'cronjob_order_cancel','7','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(29,'cronjob_order_suspend','2','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(30,'cronjob_order_terminate','14','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(31,'cronjob_delete_email_logs','90','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(32,'cronjob_close_ticket','7','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(33,'credits_enabled','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(34,'credits_minimum_deposit','5','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(35,'credits_maximum_deposit','100','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(36,'credits_maximum_credit','300','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(37,'credits_auto_use','1','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(38,'credits_on_downgrade','1','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(39,'theme','default','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(40,'theme_default_direct_checkout','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(41,'theme_default_small_images','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(42,'theme_default_show_category_description','1','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(43,'theme_default_logo_display','logo-and-name','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(44,'theme_default_home_page_text','Welcome to ⛏ StashrNode!','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(45,'theme_default_primary','hsl(229, 100%, 64%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(46,'theme_default_secondary','hsl(237, 33%, 60%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(47,'theme_default_neutral','hsl(220, 25%, 85%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(48,'theme_default_base','hsl(0, 0%, 0%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(49,'theme_default_muted','hsl(220, 0%, 53%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(50,'theme_default_inverted','hsl(100, 100%, 100%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(51,'theme_default_background','hsl(100, 100%, 100%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(52,'theme_default_background-secondary','hsl(0, 0%, 97%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(53,'theme_default_dark-primary','hsl(229, 100%, 64%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(54,'theme_default_dark-secondary','hsl(237, 33%, 60%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(55,'theme_default_dark-neutral','hsl(0, 0%, 17%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(56,'theme_default_dark-base','hsl(100, 100%, 100%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(57,'theme_default_dark-muted','hsl(0, 0%, 40%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(58,'theme_default_dark-inverted','hsl(220, 14%, 60%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(59,'theme_default_dark-background','hsl(240, 18%, 9%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(60,'theme_default_dark-background-secondary','hsl(240, 13%, 11%)','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(61,'bill_to_text','','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(62,'invoice_number_padding','1','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(63,'invoice_number_format','INV-{number}','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(64,'invoice_proforma','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(65,'invoice_snapshot','1','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(66,'gravatar_default','wavatar','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(67,'default_currency','USD','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(68,'registration_disabled','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(69,'pagination','10','string',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(70,'debug','0','boolean',0,NULL,NULL,'2026-10-03 03:20:37','2026-10-03 03:20:37'),(71,'telemetry_uuid','ed3a720d-4dfe-420c-9f33-4d7952a93153','string',0,NULL,NULL,'2026-10-03 03:20:39','2026-10-03 03:20:39');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax_rates`
--

DROP TABLE IF EXISTS `tax_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tax_rates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rate` decimal(5,2) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tax_rates_country_unique` (`country`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax_rates`
--

LOCK TABLES `tax_rates` WRITE;
/*!40000 ALTER TABLE `tax_rates` DISABLE KEYS */;
/*!40000 ALTER TABLE `tax_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_mail_logs`
--

DROP TABLE IF EXISTS `ticket_mail_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_mail_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `message_id` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_mail_logs`
--

LOCK TABLES `ticket_mail_logs` WRITE;
/*!40000 ALTER TABLE `ticket_mail_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_mail_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_message_attachments`
--

DROP TABLE IF EXISTS `ticket_message_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_message_attachments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `filesize` bigint unsigned NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `ticket_message_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_message_attachments_ticket_message_id_foreign` (`ticket_message_id`),
  CONSTRAINT `ticket_message_attachments_ticket_message_id_foreign` FOREIGN KEY (`ticket_message_id`) REFERENCES `ticket_messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_message_attachments`
--

LOCK TABLES `ticket_message_attachments` WRITE;
/*!40000 ALTER TABLE `ticket_message_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_message_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_messages`
--

DROP TABLE IF EXISTS `ticket_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `message` text NOT NULL,
  `ticket_mail_log_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_messages_ticket_id_foreign` (`ticket_id`),
  KEY `ticket_messages_user_id_foreign` (`user_id`),
  KEY `ticket_messages_ticket_mail_log_id_foreign` (`ticket_mail_log_id`),
  CONSTRAINT `ticket_messages_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ticket_messages_ticket_mail_log_id_foreign` FOREIGN KEY (`ticket_mail_log_id`) REFERENCES `ticket_mail_logs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ticket_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_messages`
--

LOCK TABLES `ticket_messages` WRITE;
/*!40000 ALTER TABLE `ticket_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'open',
  `priority` varchar(255) NOT NULL DEFAULT 'normal',
  `department` varchar(255) DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `assigned_to` bigint unsigned DEFAULT NULL,
  `service_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tickets_user_id_foreign` (`user_id`),
  KEY `tickets_assigned_to_foreign` (`assigned_to`),
  KEY `tickets_service_id_foreign` (`service_id`),
  CONSTRAINT `tickets_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tickets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authentication_logs`
--

DROP TABLE IF EXISTS `user_authentication_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authentication_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `last_used_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_authentication_logs_user_id_ip_address_index` (`user_id`,`ip_address`),
  CONSTRAINT `user_authentication_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authentication_logs`
--

LOCK TABLES `user_authentication_logs` WRITE;
/*!40000 ALTER TABLE `user_authentication_logs` DISABLE KEYS */;
INSERT INTO `user_authentication_logs` VALUES (1,1,'::1','2026-10-07 05:16:12','2026-10-03 06:49:16','2026-10-07 05:16:12');
/*!40000 ALTER TABLE `user_authentication_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sessions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ulid` char(26) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(512) DEFAULT NULL,
  `last_activity` timestamp NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_sessions_ulid_unique` (`ulid`),
  KEY `user_sessions_user_id_foreign` (`user_id`),
  CONSTRAINT `user_sessions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
INSERT INTO `user_sessions` VALUES (5,'01m4azh2rnbdvkq9341cm1n3sx',1,'::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','2026-10-07 05:49:04',NULL);
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` bigint unsigned DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `tfa_secret` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_index` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shreyansh','singhal','shreyanshsinghal08@gmail.com',1,NULL,'$2y$12$6jlhNr2rDkXBb/Nd6i5W.ONxP5axNXDVKikqyuY3bT33IOA4L1GlC',NULL,'2026-10-03 06:49:15','2026-10-03 06:49:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-07 17:32:34
