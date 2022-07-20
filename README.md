# Cadastro de Carro

**RF**
Deve ser possível cadastrar um novo carro

**RNF**

**RN**
Nao deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado como disponível por padrao.
* O usuário responsável pelo cadastro deve ser admin

# Listagem de Carros
**RF**
Deve ser possível listar todos os carros
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
Deve ser possivel listar todos os carros disponiveis pelo nome da marca
Deve ser possivel listar todos os carros disponiveis pelo nome do carro

**RNF**

**RN**
O usuario nao precisa estar logado no sistema

# Cadastro de Especificação no Carro
**RF**
Deve ser possível cadastrar uma especificacao para um carro


**RN**
Nao deve ser possível cadastrar especificacao para um carro nao cadastrado.
Nao deve ser possivel cadastrar a mesma especificacao para um carro.
O usuário responsável pelo cadastro deve ser admin

# Cadastro de imagens no Carro
**RF**
Deve ser possível cadastrar mais de uma imagem para um carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos


**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser admin

# Aluguel de carro 
**RF**
Deve ser possível cadastrar um aluguel

**RNF**
Utilizar o multer para upload dos arquivos


**RN**
O aluguel deve ter duracao minima de 24 horas
Nao deve ser possivel um novo aluguel caso já exista uma aberto aberto para o mesmo usuario
Nao deve ser possivel um novo aluguel caso já exista uma aberto aberto para o mesmo carro
