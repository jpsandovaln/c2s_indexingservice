# Table of Contents
* [General information](#general-information)
* [Technologies](#technologies)
* [Setup](#setup)
   * [Pre Requirements](#pre-requirements)
   * [Setup local env](#local)
* [Build with docker and docker-compose](#build-with-docker)
* [Indexing via API](#indexacion-via-api)
* [Indexing via RabbitMQ](#indexacion-via-api)

# General information
The indexing service has two ways to index data using message broker or through resp api. It has the following architecture:
# Technologies
Project is created with:
* Node: V16.15.1
* TypeScript
* Apollo client
* Elasticsearch client
* Express
* Rabbitmq
* Docker and docker-compose

# Setup
## Pre-Requirements
The follow apps should be installed
* node v16
* nvm

The follow services should be running:

* apollo server
* rabbitmq
* elasticsearch
## Setup local env
Follow these steps:

1. Move to "indexingservice" folder and install packages.

    ```bash
    $ cd indexingservice
    $ npm install
    ```

2. Build project

    ```bash
    $ npm run build
    ```

3. Start project
    
    ```bash
    $ npm run start
    ```

# Indexing via API
* Full re-index

    ```bash
    curl --location --request POST 'http://10.0.2.15:3030/api/v1/reindex'
    ```

* Add index

    ```bash
    curl --location --request POST 'http://10.0.2.15:3030/api/v1/assets/14725b00-2d06-12ca-90c9-d0509930b6d3'
    ```

* Update index

    ```bash
    curl --location --request PUT 'http://10.0.2.15:3030/api/v1/assets/14725b00-2d06-12ca-90c9-d0509930b6d3'
    ```

* Delete index
    ```bash
    curl --location --request DELETE 'http://10.0.2.15:3030/api/v1/assets/14725b00-2d06-12ca-90c9-d0509930b6d3'
    ```

# Indexing via RabbitMQ

To index using RabbitMQ the publisher must send the following message
