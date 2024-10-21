import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

interface Alumno {
  email: string;
  nombre: string;
  estado: string;
  rutalumno: string;
  password?: string; // Agregado para almacenar la contraseña
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbName: string = 'my_database'; // Nombre de la base de datos
  private sqliteConnection: SQLiteConnection; // Conexión a SQLite

  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite); // Inicializa la conexión
  }

  // Inicializa la base de datos y crea tablas
  async initializeDatabase() {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(
          this.dbName,
          false,            // No encriptado
          'no-encryption',  // Tipo de encriptación
          1,                // Versión de la base de datos
          false             // readonly: false (la base de datos no es de solo lectura)
        );

        await db.open(); // Abre la conexión a la base de datos

        // Crea las tablas necesarias
        await this.createTables(db);

        console.log('Base de datos inicializada correctamente');
      } else {
        console.log('Las conexiones de base de datos no son compatibles en la web.');
      }
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  // Crea las tablas necesarias en la base de datos
  private async createTables(db: SQLiteDBConnection) {
    const createPerfilTableQuery = `CREATE TABLE IF NOT EXISTS perfil (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      correo TEXT,
      telefono TEXT,
      profileImage TEXT // Columna para almacenar la imagen del perfil
    );`;

    const createAsistenciaTableQuery = `CREATE TABLE IF NOT EXISTS asistencia (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    const createAlumnosTableQuery = `CREATE TABLE IF NOT EXISTS alumnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      nombre TEXT NOT NULL,
      estado TEXT,
      rutalumno TEXT NOT NULL,
      password TEXT NOT NULL // Agregado para almacenar la contraseña
    );`;

    try {
      await db.execute(createPerfilTableQuery);
      await db.execute(createAsistenciaTableQuery);
      await db.execute(createAlumnosTableQuery); // Crear la tabla de alumnos
      console.log('Tablas creadas o ya existen.');
    } catch (error) {
      console.error('Error al crear las tablas:', error);
    }
  }

  // Método para obtener la lista de alumnos
  async getAlumnos(): Promise<Alumno[]> {
    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const selectQuery = `SELECT * FROM alumnos;`; // Asegúrate de que la tabla 'alumnos' exista.
    let alumnos: Alumno[] = [];
    
    try {
      const res = await db.query(selectQuery);
      alumnos = res.values || []; // Asigna los resultados a la lista de alumnos
      console.log('Alumnos obtenidos correctamente:', alumnos);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
    } finally {
      await db.close(); // Cierra la conexión después de la consulta
    }
    
    return alumnos;
  }

  // Método para agregar un alumno
  async addAlumno(email: string, nombre: string, estado: string, rutalumno: string, password: string): Promise<void> {
    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const insertQuery = `INSERT INTO alumnos (email, nombre, estado, rutalumno, password) VALUES (?, ?, ?, ?, ?);`;
    try {
      await db.run(insertQuery, [email, nombre, estado, rutalumno, password]);
      console.log('Alumno agregado correctamente:', { email, nombre, estado, rutalumno });
    } catch (error) {
      console.error('Error al agregar alumno:', error);
    } finally {
      await db.close(); // Cierra la conexión después de la inserción
    }
  }

  // Método para verificar las credenciales de login
  async verifyLogin(email: string, password: string): Promise<boolean> {
    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const selectQuery = `SELECT * FROM alumnos WHERE email = ? AND password = ?;`;
    try {
      const res = await db.query(selectQuery, [email, password]);
      if (res.values && res.values.length > 0) {
        console.log('Login exitoso:', res.values[0]);
        return true; // Login exitoso
      } else {
        console.log('Credenciales incorrectas');
        return false; // Login fallido
      }
    } catch (error) {
      console.error('Error al verificar el login:', error);
      return false; // En caso de error, también consideramos el login fallido
    } finally {
      await db.close(); // Cierra la conexión después de la consulta
    }
  }

  // Método para actualizar el perfil incluyendo la imagen
  async updateProfile(id: number, nombre: string, correo: string, telefono: string, profileImage: string): Promise<void> {
    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const updateQuery = `UPDATE perfil SET name = ?, correo = ?, telefono = ?, profileImage = ? WHERE id = ?;`;
    try {
      await db.run(updateQuery, [nombre, correo, telefono, profileImage, id]);
      console.log(`Perfil con ID ${id} actualizado correctamente.`);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    } finally {
      await db.close(); // Cierra la conexión después de la actualización
    }
  }

  // Método para obtener el perfil por ID
  async getProfile(id: number): Promise<any> {
    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const selectQuery = `SELECT * FROM perfil WHERE id = ?;`;
    let result: any;
    try {
      const res = await db.query(selectQuery, [id]);
      result = res.values?.[0] || null; // Asegúrate de que result sea un objeto o null
      console.log('Perfil obtenido correctamente:', result);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    } finally {
      await db.close(); // Cierra la conexión después de la consulta
    }
    return result;
  }

  // Método para eliminar un perfil por su ID
  async deleteProfile(id: number): Promise<void> {
    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const deleteQuery = `DELETE FROM perfil WHERE id = ?;`;
    try {
      await db.run(deleteQuery, [id]); 
      console.log(`Perfil con ID ${id} eliminado correctamente.`);
    } catch (error) {
      console.error('Error al eliminar el perfil:', error);
    } finally {
      await db.close(); 
    }
  }

  // Método para insertar un registro de asistencia
  async insertData(asistencia: string | null): Promise<void> {
    if (!asistencia) {
      throw new Error('No se puede insertar asistencia vacía');
    }

    const db: SQLiteDBConnection = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await db.open();

    const insertQuery = `INSERT INTO asistencia (codigo) VALUES (?);`; 
    try {
      await db.run(insertQuery, [asistencia]);
      console.log('Asistencia registrada correctamente:', asistencia);
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
      throw error;
    } finally {
      await db.close(); // Cierra la conexión después de la inserción
    }
  }

  async addTestAlumno() {
    const email = 'alumno@example.com'; // Cambia esto por el correo deseado
    const nombre = 'Alumno Test';
    const estado = 'activo';
    const rutalumno = '12345678-9'; // Cambia esto por el RUT deseado
    const password = 'Perro234$1'; // Asegúrate de que la contraseña sea igual a la que validas en el login

    await this.addAlumno(email, nombre, estado, rutalumno, password);
}

}
