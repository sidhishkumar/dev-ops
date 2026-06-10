
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