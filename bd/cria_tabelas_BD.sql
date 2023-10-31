CREATE TABLE usuario 
( 
 id serial not null  ,  
 senha VARCHAR(50) NOT NULL,  
 email VARCHAR(50) NOT NULL,  
 nome VARCHAR(50) NOT NULL, 
	PRIMARY KEY (id)
); 

CREATE TABLE aluno 
( 
 id serial not null ,  
 sexo CHAR(10) NOT NULL,  
 nome VARCHAR(50) NOT NULL,  
 cpf bigint NOT NULL,  
 dt_nascimento DATE NOT NULL,  
 telefone VARCHAR(30) NOT NULL,  
 email VARCHAR(30) NOT NULL,  
 status VARCHAR(30) NOT NULL,  
 plano VARCHAR(30) NOT NULL,  
 idUsuario INT,  
 
	PRIMARY KEY (id)
); 

CREATE TABLE avaliacao 
( 
 id serial not null,  
 peso FLOAT NOT NULL,  
 altura FLOAT NOT NULL,  
 etc VARCHAR(30) NOT NULL,  
 id_aluno INT,  

	PRIMARY KEY(id)
); 

CREATE TABLE pagamento 
( id serial not null,
 id_aluno INT not null, 
 dt_pagamento date not null,    
 status VARCHAR(30) not null,  
 valor FLOAT, 
	PRIMARY KEY(id)
); 

CREATE TABLE treino 
( 
id serial not null,
 observacao VARCHAR(50),  
 carga INT NOT NULL,  
 serie INT NOT NULL,  
 exercicio VARCHAR(50) NOT NULL,  
 tipo VARCHAR(50) NOT NULL,  
 repeticao INT,  
 idAluno INT, 
	PRIMARY KEY (id)
); 

ALTER TABLE aluno ADD FOREIGN KEY(idUsuario) REFERENCES usuario (id)
-- ALTER TABLE aluno ADD FOREIGN KEY(idPagamento) REFERENCES pagamento (id)
ALTER TABLE avaliacao ADD FOREIGN KEY(id_aluno) REFERENCES aluno (id)
---ALTER TABLE avaliacao ADD FOREIGN KEY(idAluno) REFERENCES aluno (id)
ALTER TABLE pagamento ADD FOREIGN KEY(id_aluno ) REFERENCES aluno (id)
ALTER TABLE treino ADD FOREIGN KEY(idAluno) REFERENCES aluno (id)

select * from usuario
select * from aluno 
select * from avaliacao
select * from pagamento
select * from treino
select id from aluno ORDER BY id DESC LIMIT 1
INSERT INTO usuario(senha, email, nome) VALUES('123456', 'usuario@gmail', 'usuario1')