import { ReactNode } from 'react';
import { EditableText } from './EditableText';
import { useAdmin } from '../../contexts/AdminContext';

interface EditableWrapperProps {
  path: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

/**
 * Wrapper simple pour rendre n'importe quel texte éditable
 * Usage: <EditableWrapper path="texts.someKey" defaultValue="Mon texte" />
 */
export function EditableWrapper({
  path,
  defaultValue,
  as = 'span',
  className = '',
  style,
  multiline = false,
}: EditableWrapperProps) {
  const { content } = useAdmin();
  
  // Récupérer la valeur depuis le contenu en suivant le path
  const getValue = () => {
    if (!content) return defaultValue;
    
    const pathParts = path.split('.');
    let current: any = content;
    
    for (const part of pathParts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return defaultValue;
      }
    }
    
    return current || defaultValue;
  };
  
  return (
    <EditableText
      path={path}
      value={getValue()}
      as={as}
      className={className}
      style={style}
      multiline={multiline}
    />
  );
}
