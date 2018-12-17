-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 17 déc. 2018 à 19:51
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `page_unitaire`
--

-- --------------------------------------------------------

--
-- Structure de la table `disliked_shops`
--

CREATE TABLE `disliked_shops` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `date_dislike` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `disliked_shops`
--

INSERT INTO `disliked_shops` (`id`, `user_id`, `shop_id`, `date_dislike`) VALUES
(1, 1, 1, 1544984785221),
(2, 1, 2, 1544984787754),
(3, 1, 5, 1544984790803),
(4, 15, 1, 1545068313511),
(5, 15, 2, 1545068314383),
(6, 15, 5, 1545068315155),
(7, 15, 4, 1545068316172),
(8, 15, 3, 1545068321609);

-- --------------------------------------------------------

--
-- Structure de la table `liked_shops`
--

CREATE TABLE `liked_shops` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `shops`
--

CREATE TABLE `shops` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `shops`
--

INSERT INTO `shops` (`id`, `nom`, `x`, `y`, `image_path`) VALUES
(1, 'Zara', 231, -123, 'img/zara.jpg'),
(2, 'Marwa', 54, 43, 'img/marwa.jpg'),
(3, 'Mango', 543, -234, 'img/mango.jpg'),
(4, 'Spring Field', 547, 654, 'img/springfield.jpg'),
(5, 'United Color Of Benetton', 0, 56, 'img/united.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `x`, `y`) VALUES
(1, 'ayoub@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 323, 0),
(2, 'hicham@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', -456, 454),
(3, 'hamza@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, 1),
(15, 'ayoub23@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 11, 12);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `disliked_shops`
--
ALTER TABLE `disliked_shops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `liked_shops`
--
ALTER TABLE `liked_shops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `disliked_shops`
--
ALTER TABLE `disliked_shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `liked_shops`
--
ALTER TABLE `liked_shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `disliked_shops`
--
ALTER TABLE `disliked_shops`
  ADD CONSTRAINT `disliked_shops_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`),
  ADD CONSTRAINT `disliked_shops_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `liked_shops`
--
ALTER TABLE `liked_shops`
  ADD CONSTRAINT `liked_shops_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`),
  ADD CONSTRAINT `liked_shops_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
