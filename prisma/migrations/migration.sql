-- CreateTable
CREATE TABLE `travel-blog` (
    `blog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_name` VARCHAR(45) NOT NULL,
    `review` VARCHAR(500) NOT NULL,
    `user_id` INTEGER NULL,
    `pictures` VARCHAR(500) NOT NULL,

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`blog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `profile_pic` VARCHAR(200) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

