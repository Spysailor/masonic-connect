
import { BaseService, ApiResponse } from './base.service';

/**
 * Interface pour les métadonnées d'un fichier
 */
export interface FileMetadata {
  path: string;
  url: string;
  name: string;
  size?: number;
  contentType?: string;
}

export class StorageService extends BaseService {
  /**
   * Télécharge un fichier dans un bucket Supabase
   */
  async uploadFile(
    bucketName: string,
    file: File,
    folderPath: string = '',
    options: {
      fileName?: string;
      contentType?: string;
      upsert?: boolean;
    } = {}
  ): Promise<ApiResponse<FileMetadata>> {
    try {
      // Générer un nom de fichier unique si non fourni
      let fileName = options.fileName;
      
      if (!fileName) {
        // Remplacer les caractères non sécurisés et les espaces
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
        // Ajouter un timestamp pour éviter les collisions
        const timestamp = new Date().getTime();
        fileName = `${timestamp}-${cleanName}`;
      }
      
      // Construire le chemin complet
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
      
      // Télécharger le fichier vers Supabase
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          contentType: options.contentType || file.type,
          upsert: options.upsert === undefined ? true : options.upsert
        });
      
      if (error) throw error;
      
      // Générer l'URL publique pour accéder au fichier
      const { data: { publicUrl } } = this.supabase.storage
        .from(bucketName)
        .getPublicUrl(data?.path || filePath);
      
      return {
        data: {
          path: data?.path || filePath,
          url: publicUrl,
          name: fileName,
          size: file.size,
          contentType: file.type
        },
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors du téléchargement du fichier'),
        status: 'error'
      };
    }
  }
  
  /**
   * Supprime un fichier du stockage
   */
  async deleteFile(bucketName: string, filePath: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await this.supabase.storage
        .from(bucketName)
        .remove([filePath]);
      
      if (error) throw error;
      
      return {
        data: null,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error deleting file:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la suppression du fichier'),
        status: 'error'
      };
    }
  }
  
  /**
   * Liste les fichiers dans un dossier
   */
  async listFiles(bucketName: string, folderPath: string = ''): Promise<ApiResponse<FileMetadata[]>> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .list(folderPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });
      
      if (error) throw error;
      
      // Filtrer uniquement les fichiers (pas les dossiers)
      const files = data
        .filter(item => !item.id.endsWith('/'))
        .map(item => {
          const path = folderPath ? `${folderPath}/${item.name}` : item.name;
          const { data: { publicUrl } } = this.supabase.storage
            .from(bucketName)
            .getPublicUrl(path);
          
          return {
            path,
            url: publicUrl,
            name: item.name,
            size: item.metadata?.size,
            contentType: item.metadata?.mimetype
          };
        });
      
      return {
        data: files,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error listing files:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération des fichiers'),
        status: 'error'
      };
    }
  }
  
  /**
   * Crée ou met à jour un fichier texte (comme un fichier JSON ou Markdown)
   */
  async uploadTextFile(
    bucketName: string,
    filePath: string,
    content: string,
    contentType: string = 'text/plain'
  ): Promise<ApiResponse<FileMetadata>> {
    try {
      // Convertir le contenu texte en Blob
      const blob = new Blob([content], { type: contentType });
      const file = new File([blob], filePath.split('/').pop() || 'file.txt', { type: contentType });
      
      // Extraire le chemin du dossier (sans le nom de fichier)
      const pathParts = filePath.split('/');
      pathParts.pop();
      const folderPath = pathParts.join('/');
      
      // Utiliser la méthode uploadFile pour télécharger
      return this.uploadFile(bucketName, file, folderPath, {
        fileName: filePath.split('/').pop(),
        contentType,
        upsert: true
      });
    } catch (error) {
      console.error('Error uploading text file:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors du téléchargement du fichier texte'),
        status: 'error'
      };
    }
  }
  
  /**
   * Télécharge un fichier depuis Supabase Storage
   */
  async downloadFile(bucketName: string, filePath: string): Promise<ApiResponse<Blob>> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .download(filePath);
      
      if (error) throw error;
      
      return {
        data,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error downloading file:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors du téléchargement du fichier'),
        status: 'error'
      };
    }
  }
  
  /**
   * Récupère un fichier texte depuis Supabase Storage
   */
  async getTextFile(bucketName: string, filePath: string): Promise<ApiResponse<string>> {
    try {
      const { data, error, status } = await this.downloadFile(bucketName, filePath);
      
      if (error) throw error;
      if (!data) throw new Error('No data received');
      
      const text = await data.text();
      
      return {
        data: text,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error getting text file:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération du fichier texte'),
        status: 'error'
      };
    }
  }
}

// Export d'une instance singleton du service
export const storageService = new StorageService();
