# Deploy Boy

Deploy Boy is a comprehensive deployment platform designed as a clone of Vercel. It facilitates efficient management of static assets and containerized applications through a robust, scalable architecture.
Objectives

    Reverse Proxy: Routes requests based on subdomains to specific S3 static asset locations for seamless content delivery.
    Build Server: Automates the process of cloning repositories, building Docker images, and pushing them to AWS ECR.
    API Server: Manages deployment requests, orchestrates container tasks with AWS ECS, and integrates real-time updates using Redis and Socket.IO.

Components

    Reverse Proxy (s3-reverse-proxy):
        Handles dynamic routing of requests to S3 static assets.
        Ensures efficient content management based on subdomains.

    Build Server (build-server):
        Clones repositories, builds Docker images, and pushes them to AWS ECR.
        Streamlines the deployment pipeline for scalable solutions.

    API Server (api-server):
        Provides REST APIs for managing deployments.
        Integrates with AWS ECS for container orchestration and uses Redis and Socket.IO for real-time log updates.

Setup Guide

    Prerequisites:
        Node.js
        Redis
        Docker
        AWS ECS and ECR

    Local Setup:
        Install dependencies for all services: npm install in api-server, build-server, and s3-reverse-proxy.
        Build the Docker image for build-server and push it to AWS ECR.
        Configure api-server with required AWS ECS and Redis credentials.
        Run the servers:
            node index.js in api-server and s3-reverse-proxy.

Ports

    API Server: 9000
    Socket.IO Server: 9002
    Reverse Proxy: 8000
