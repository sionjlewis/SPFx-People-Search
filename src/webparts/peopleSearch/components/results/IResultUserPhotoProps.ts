import {
    PersonaSize, 
    PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';

export interface IResultUserPhotoProps { 
    userId: any; 
    fullName: string; 
    displayName: string;
    mail: string; 
    phone: string; 
    personaSize: PersonaSize; 
    userPresence: PersonaPresence;
    photoUrl: string;
    tenantName: string; 
}