<div align="center">
  <h1>Book Reading Backend</h1>
  <p>Author: <a href="https://github.com/IstiyakRiyad" target="_blank">Md. Istiyak Hossain</a> </p>
</div>

## Setup Process:

``` bash
# Download repository:
git clone https://github.com/IstiyakRiyad/Book-Reading-Backend.git

# Go to parent directory:
cd Book-Reading-Backend

# Install dependencies:
npm i

# Start Mongodb database with docker(you can run your local mongodb database)
docker-compose up -d

# Generate public key and private key for tokens
npm run generateKey

# Setup admin(remove database and create admin user)
npm run setup

# Run backend server
npm run dev

```
