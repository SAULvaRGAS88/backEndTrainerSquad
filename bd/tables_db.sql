-- TABELAS SANDRO
CREATE TABLE aluno 
( 
 id serial PRIMARY KEY,  
 sexo CHAR(10) NOT NULL,  
 nome VARCHAR(50) NOT NULL,  
 cpf INT NOT NULL,  
 dt_nascimento DATE NOT NULL,  
 telefone VARCHAR(30) NOT NULL,  
 email VARCHAR(30) NOT NULL,  
 status VARCHAR(30) NOT NULL,  
 plano VARCHAR(30) NOT NULL,  
 idUsuario INT,  
 idPagamento INT  
);

INSERT INTO aluno(sexo, nome, cpf, dt_nascimento, telefone, email, status, plano, idUsuario) 
VALUES('F', 'Aluno 1', '11122233344', '09/10/2000', '91111-2222', 'aluno1@email.com', 'Ativo', 'Mensal', 
	   (SELECT id FROM usuario WHERE id = 1) ) RETURNING id

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
	id serial PRIMARY KEY,
	qtd int NOT NULL,
	peso float NOT NULL, -- massa corporal (kg)
	altura float NOT NULL, -- estatura (m)
	nome varchar(255) NOT NULL,
	dt_aval date NOT NULL,
	sexo int NOT NULL, -- 1 masc, 0 fem
	idade int NOT NULL,
	circ_punho float NOT NULL,
	circ_abd float NOT NULL,
	circ_gluteo float NOT NULL,
	porc_gordura float NOT NULL,
	massa_gordura float NOT NULL,
	massa_magra float NOT NULL,
	porc_massa_musc float NOT NULL,
	massa_muscu float NOT NULL,
	ingestao_calorica int NOT NULL,
	taxa_metabolica float NOT NULL,
	diferenca float NOT NULL,
	idAluno INT
)

INSERT INTO avaliacao(qtd, peso, altura, nome, dt_aval, sexo, idade, circ_punho, circ_abd,
					  circ_gluteo, porc_gordura, massa_gordura, massa_magra, porc_massa_musc,
                      massa_muscu, ingestao_calorica, taxa_metabolica, diferenca, idAluno)
VALUES((SELECT count(idAluno) + 1 FROM avaliacao WHERE idAluno = 2), 68.6, 1.65, 'Aluno 1', '13/10/2023',
	  1, 21, 17.1, 95, 100, 20.8, 19.0, 72.5, 31.2, 28.5, 2000, 2079, 78.9, 2)
	  
	  DELETE FROM avaliacao

CREATE TABLE treino (
	id serial PRIMARY KEY,
	obs varchar(255),
	carga int NOT NULL,
	serie int NOT NULL,
	exercicio varchar(50) NOT NULL,
	tipo char(3) NOT NULL,
	repeticao int,
	idAluno int
)

INSERT INTO treino(obs, carga, serie, exercicio, tipo, repeticao, idAluno)
VALUES('aaa', 10, 4, 'Agachamento', 'A', 15, (SELECT id FROM aluno WHERE id = 2))

INSERT INTO treino(obs, carga, serie, exercicio, tipo, repeticao, idAluno)
VALUES('aaa', 10, 4, 'Rosca direta', 'B', 15, (SELECT id FROM aluno WHERE id = 2))

INSERT INTO treino(obs, carga, serie, exercicio, tipo, repeticao, idAluno)
VALUES('aaa', 10, 4, 'Abdutor', 'C', 15, (SELECT id FROM aluno WHERE id = 2))

INSERT INTO treino(obs, carga, serie, exercicio, tipo, repeticao, idAluno)
VALUES('aaa', 10, 4, 'Desenvolvimento', 'D', 15, (SELECT id FROM aluno WHERE id = 2))

ALTER TABLE aluno ADD FOREIGN KEY(idUsuario) REFERENCES usuario (id)
ALTER TABLE aluno ADD FOREIGN KEY(idPagamento) REFERENCES pagamento (id)
ALTER TABLE pagamento ADD COLUMN id_aluno INT
ALTER TABLE pagamento ADD FOREIGN KEY (id_aluno) REFERENCES aluno (id)
ALTER TABLE aluno DROP COLUMN idPagamento

ALTER TABLE aluno 
ALTER COLUMN cpf TYPE VARCHAR(50)

ALTER TABLE avaliacao ADD FOREIGN KEY(idAluno) REFERENCES aluno (id)

ALTER TABLE pagamento ADD FOREIGN KEY(id_aluno) REFERENCES aluno (id)

ALTER TABLE treino ADD FOREIGN KEY(idAluno) REFERENCES aluno (id)

ALTER TABLE avaliacao ADD COLUMN qtd INT

SELECT * FROM treino WHERE tipo = 'A'

SELECT * FROM usuario ORDER BY id
SELECT * FROM aluno ORDER BY id
SELECT * FROM avaliacao ORDER BY id
SELECT * FROM pagamento ORDER BY id
SELECT * FROM treino ORDER BY id

SELECT * FROM treino WHERE tipo = 'A'

SELECT aluno.nome, treino.* FROM treino 
INNER JOIN aluno ON aluno.id = idAluno
WHERE idAluno = 5

SELECT aluno.nome, avaliacao.* FROM avaliacao INNER JOIN aluno ON aluno.id = avaliacao.idAluno
                     WHERE avaliacao.idAluno = 50