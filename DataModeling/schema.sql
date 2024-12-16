-- Create Doctors table
CREATE TABLE Doctors (
    doctor_id INT PRIMARY KEY,
    name VARCHAR(255),
    specialization VARCHAR(255)
);

-- Create Patients table
CREATE TABLE Patients (
    patient_id INT PRIMARY KEY,
    name VARCHAR(255),
    dob DATE
);

-- Create Diseases table
CREATE TABLE Diseases (
    disease_id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

-- Create Visits table
CREATE TABLE Visits (
    visit_id INT PRIMARY KEY,
    doctor_id INT,
    patient_id INT,
    visit_date DATE,
    FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);

-- Create Diagnoses table
CREATE TABLE Diagnoses (
    diagnosis_id INT PRIMARY KEY,
    visit_id INT,
    disease_id INT,
    FOREIGN KEY (visit_id) REFERENCES Visits(visit_id),
    FOREIGN KEY (disease_id) REFERENCES Diseases(disease_id)
);

-- Create Doctor_Patient table
CREATE TABLE Doctor_Patient (
    doctor_id INT,
    patient_id INT,
    PRIMARY KEY (doctor_id, patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);

-- Insert sample doctors
INSERT INTO Doctors (doctor_id, name, specialization) VALUES (1, 'Dr. Smith', 'Cardiology');
INSERT INTO Doctors (doctor_id, name, specialization) VALUES (2, 'Dr. Jones', 'Neurology');

-- Insert sample patients
INSERT INTO Patients (patient_id, name, dob) VALUES (1, 'John Doe', '1980-01-01');
INSERT INTO Patients (patient_id, name, dob) VALUES (2, 'Jane Roe', '1990-02-02');

-- Insert sample diseases
INSERT INTO Diseases (disease_id, name, description) VALUES (1, 'Flu', 'Influenza');
INSERT INTO Diseases (disease_id, name, description) VALUES (2, 'Cold', 'Common Cold');

-- Insert sample visits
INSERT INTO Visits (visit_id, doctor_id, patient_id, visit_date) VALUES (1, 1, 1, '2023-10-01');
INSERT INTO Visits (visit_id, doctor_id, patient_id, visit_date) VALUES (2, 2, 2, '2023-10-02');

-- Insert sample diagnoses
INSERT INTO Diagnoses (diagnosis_id, visit_id, disease_id) VALUES (1, 1, 1);
INSERT INTO Diagnoses (diagnosis_id, visit_id, disease_id) VALUES (2, 2, 2);

-- Insert sample doctor-patient relationships
INSERT INTO Doctor_Patient (doctor_id, patient_id) VALUES (1, 1);
INSERT INTO Doctor_Patient (doctor_id, patient_id) VALUES (2, 2);