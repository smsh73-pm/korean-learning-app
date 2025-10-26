# Azure App Service 배포 설정

## Azure 배포를 위한 설정 파일들

### 1. Azure CLI 설치 및 로그인
```bash
# Azure CLI 설치 (macOS)
brew install azure-cli

# 로그인
az login
```

### 2. 리소스 그룹 및 App Service 생성
```bash
# 리소스 그룹 생성
az group create --name korean-learning-rg --location eastus

# App Service 플랜 생성
az appservice plan create --name korean-learning-plan --resource-group korean-learning-rg --sku B1 --is-linux

# Web App 생성
az webapp create --resource-group korean-learning-rg --plan korean-learning-plan --name korean-learning-app --runtime "NODE|18-lts"
```

### 3. 환경 변수 설정
```bash
# NextAuth 설정
az webapp config appsettings set --resource-group korean-learning-rg --name korean-learning-app --settings NEXTAUTH_SECRET="your-secret-key"
az webapp config appsettings set --resource-group korean-learning-rg --name korean-learning-app --settings NEXTAUTH_URL="https://korean-learning-app.azurewebsites.net"

# 데이터베이스 연결
az webapp config appsettings set --resource-group korean-learning-rg --name korean-learning-app --settings DATABASE_URL="your-database-connection-string"
```

### 4. 배포
```bash
# ZIP 배포
npm run build
zip -r korean-learning-app.zip . -x "node_modules/*" ".git/*" "*.log"
az webapp deployment source config-zip --resource-group korean-learning-rg --name korean-learning-app --src korean-learning-app.zip
```

## Azure Database for PostgreSQL 설정
```bash
# PostgreSQL 서버 생성
az postgres server create --resource-group korean-learning-rg --name korean-learning-db --admin-user koreanadmin --admin-password "YourPassword123!" --sku-name B_Gen5_1

# 데이터베이스 생성
az postgres db create --resource-group korean-learning-rg --server-name korean-learning-db --name koreanlearning

# 방화벽 규칙 추가 (Azure 서비스 허용)
az postgres server firewall-rule create --resource-group korean-learning-rg --server korean-learning-db --name AllowAzureServices --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
```

## 비용 예상
- **App Service B1**: 월 $13.14
- **PostgreSQL B_Gen5_1**: 월 $25.20
- **총 비용**: 월 $38.34 (약 5만원)
