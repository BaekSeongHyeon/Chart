#FROM node:14
## 경로 설정하기
#WORKDIR /app
## package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
#COPY package.json .
## 명령어 실행 (의존성 설치)
#RUN npm install
## 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
#COPY . .
## 3000번 포트 노출
#EXPOSE 3000

# npm start 스크립트 실행
#CMD ["npm", "start"]
#########################################
FROM node:14 AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
#COPY package-lock.json ./
COPY package.json ./
# Installs all node packages
RUN npm install


# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx
#copies React to the container directory
# Set working directory to nginx resources directory
# WORKDIR /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Remove default nginx static resources
RUN rm -rf ./usr/share/nginx/html/*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html/
# Containers run nginx with global directives and daemon off
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
