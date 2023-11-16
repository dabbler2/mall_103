# mall_103

## .env variables

TOKEN_KEY

DB_PW

DB_NAME

DB_HOST

## API documentation

https://docs.google.com/spreadsheets/d/19t8fuKcx-vdLqZh0fNnIGP5pSiOCLSaAn128T6zuTwc/edit#gid=0

## ERD diagram

https://www.erdcloud.com/d/rg4sekc8Sb7rKoPZf

<!--
## 더 고민해 보기

1. **암호화 방식**
- 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 `단방향 암호화`와 `양방향 암호화` 중 어떤 암호화 방식에 해당할까요?

  복호화가 필요하지 않은 단방향 방식이다.

- 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?

  

2. **인증 방식**
- JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
- 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?

3. **인증과 인가**
- 인증과 인가가 무엇인지 각각 설명해 주세요.

  인증은 사용자가 요건을 갖추었는지 확인하는 과정이고 인가는 사용자에게 적절한 권한을 부여하는 것이다.

- 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.

  적법하게 로그인해서 맞는 토큰을 갖고 있는지를 보기 때문에 인증에 해당한다.

4. **Http Status Code**
- 과제를 진행하면서 `사용한 Http Status Code`를 모두 나열하고, 각각이 `의미하는 것`과 `어떤 상황에 사용`했는지 작성해 주세요.

  GET

  사용자 정보 조회, 상품 조회에 사용

  POST 

  회원가입, 로그인, 상품 등록에 사용

  PUT

  상품 정보 수정에 사용

  DELETE

  상품 삭제에 사용

5. **리팩토링**
- MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?

  

- 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.

  

6. **서버 장애 복구**
- 현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다. 만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다. AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요?
(Hint: PM2에서 제공하는 기능 중 하나입니다.)

7. **개발 환경**
- nodemon은 어떤 역할을 하는 패키지이며, 사용했을 때 어떤 점이 달라졌나요?

  실행한 디렉토리에 파일의 변화가 생길 때마다 프로그램을 자동으로 다시 시작해서 편의성을 높여주었다.

- npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(`--global, -g`), 개발용(`--save-dev, -D`)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?

  

-->
