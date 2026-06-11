
Below code yml code is used to deploy the code on server using github action
*****************************************************************************
name: Deploy Nodejs code on Excloud
on:
  push: 
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

     
      - name: Deploy to Excloud
        uses: appleboy/ssh-action@v1.0.3
        with: 
          host: 210.79.129.247
          username: ubuntu
          key: ${{ secrets.PRIVATE_KEY }}
          script: |
            echo "Deploying code on Excloud server..."
            cd /home/ubuntu/dev-ops  
            git pull
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            npm install
            pm2 restart 0

************************************************************************************

*****  Adding Docker ************

name: Deploy Nodejs code on Excloud
on:
  push: 
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v4
        with:
          username: ${{ vars.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}


      - name: set up Docker Buildx
        uses: docker/build-push-action@v4

      - name: Build and push Docker image
        run: |
          docker build -t ${{ vars.DOCKER_USERNAME }}/chaicode:latest .
          docker push ${{ vars.DOCKER_USERNAME }}/chaicode:latest
     
      - name: Deploy to Excloud
        uses: appleboy/ssh-action@v1.0.3
        with: 
          host: 210.79.129.247
          username: ubuntu
          key: ${{ secrets.PRIVATE_KEY }}
          script: |
            # kill existing container
            sudo docker ps -q --filter "name=chaicode" | xargs -r docker
            sudo docker rm -f chaicode || true
            # pull latest image
            sudo docker pull ${{ vars.DOCKER_USERNAME }}/chaicode:latest
            # run new container
            sudo docker run -d --name chaicode -p 80:8000 ${{ vars.DOCKER_USERNAME }}/chaicode:latest  
            # clean up old images
            sudo docker image prune -f 

*************************************************************

