-- TABELAS SANDRO
CREATE TABLE aluno 
( 
 id serial PRIMARY KEY,  
 sexo CHAR(10) NOT NULL,  
 nome VARCHAR(50) NOT NULL,  
 cpf VARCHAR(30) NOT NULL,  
 dt_nascimento DATE NOT NULL,  
 telefone VARCHAR(30) NOT NULL,  
 email VARCHAR(30) NOT NULL,  
 status VARCHAR(30) NOT NULL,  
 plano VARCHAR(30) NOT NULL,  
 idUsuario INT 
);

CREATE TABLE pagamento 
( id serial PRIMARY KEY,
 id_aluno INT,  
 dt_pagamento DATE NOT NULL,    
 status VARCHAR(30) NOT NULL,  
 valor FLOAT NOT NULL
);


-- MINHAS TABELAS
CREATE TABLE usuario (
 id serial PRIMARY KEY,  
 senha VARCHAR(50) NOT NULL,  
 email VARCHAR(50) NOT NULL,  
 nome VARCHAR(50) NOT NULL
)

CREATE TABLE avaliacao (
	id SERIAL PRIMARY KEY,
	objetivo VARCHAR(200) NOT NULL
	data DATE NOT NULL,
	peso FLOAT NOT NULL, -- massa corporal (kg)
	altura FLOAT NOT NULL, -- estatura (m)
	imc FLOAT NOT NULL,
	idade INT NOT NULL,
	sexo INT NOT NULL, -- 1 masc, 0 fem
	circ_punho FLOAT NOT NULL,
	circ_abd FLOAT NOT NULL,
	circ_gluteo FLOAT NOT NULL,
	massa_gordura FLOAT NOT NULL,
	porc_gordura FLOAT NOT NULL,
	massa_magra FLOAT NOT NULL,
	porc_massa_musc FLOAT NOT NULL,
	massa_musc FLOAT NOT NULL,
	qtd INT NOT NULL,
	idAluno INT
)

CREATE TABLE treino (
	id SERIAL PRIMARY KEY,
	obs VARCHAR(255),
	carga INT NOT NULL,
	serie INT NOT NULL,
	exercicio VARCHAR(50) NOT NULL,
	tipo VARCHAR(3) NOT NULL,
	repeticao INT,
	idAluno INT
)

ALTER TABLE aluno ADD FOREIGN KEY(idUsuario) REFERENCES usuario (id)
ALTER TABLE pagamento ADD FOREIGN KEY (id_aluno) REFERENCES aluno (id)
ALTER TABLE avaliacao ADD FOREIGN KEY(idAluno) REFERENCES aluno (id)
ALTER TABLE treino ADD FOREIGN KEY(idAluno) REFERENCES aluno (id)

SELECT * FROM usuario ORDER BY id
SELECT * FROM aluno ORDER BY id
SELECT * FROM avaliacao ORDER BY id
SELECT * FROM pagamento ORDER BY id
SELECT * FROM treino ORDER BY id