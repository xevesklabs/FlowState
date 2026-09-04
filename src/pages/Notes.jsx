import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { Plus, Trash2, Pin, FileText } from 'lucide-react';

export function Notes() {
  const { notes, pinnedNotes, unpinnedNotes, addNote, updateNote, deleteNote, togglePin } = useNotes();
  
  // 1. Store the user's explicit selection (defaults to null)
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // 2. DERIVE STATE: No useEffect needed!
  // The active note is either the user's selection OR the first available note.
  const activeNote = notes.find(n => n.id === selectedNoteId) || (notes.length > 0 ? notes[0] : null);
  const activeNoteId = activeNote?.id;

  const handleCreateNote = async () => {
    const newId = await addNote();
    setSelectedNoteId(newId);
  };

  const renderSidebarList = (list, label) => {
    if (list.length === 0) return null;
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
          {label}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {list.map(note => (
            <div 
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '6px',
                background: activeNoteId === note.id ? '#1a1a1a' : 'transparent',
                borderLeft: activeNoteId === note.id ? '2px solid #fff' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontSize: '0.9rem', color: activeNoteId === note.id ? '#fff' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: activeNoteId === note.id ? 500 : 400 }}>
                  {note.title || 'Untitled Note'}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', opacity: activeNoteId === note.id ? 1 : 0.4 }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePin(note.id, note.isPinned); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: note.isPinned ? 'var(--accent-orange)' : 'var(--text-secondary)' }}
                >
                  <Pin size={14} />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    deleteNote(note.id); 
                    if(selectedNoteId === note.id) setSelectedNoteId(null);
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 6rem)', gap: '2rem' }}>
      
      {/* Sidebar - Note List */}
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, color: '#fff' }}>Notes.</h1>
          <button 
            onClick={handleCreateNote}
            style={{ 
              background: '#fff', color: '#000', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
          {notes.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '8px', fontSize: '0.85rem' }}>
              No notes yet. Create one to get started.
            </div>
          ) : (
            <>
              {renderSidebarList(pinnedNotes, 'Pinned')}
              {renderSidebarList(unpinnedNotes, 'All Notes')}
            </>
          )}
        </div>
      </div>

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        {activeNote ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', width: '100%' }}>
            <input
              type="text"
              value={activeNote.title}
              onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
              placeholder="Note Title..."
              className="font-serif"
              style={{ 
                background: 'transparent', border: 'none', outline: 'none', color: '#fff',
                fontSize: '3rem', fontWeight: 600, marginBottom: '2rem', width: '100%'
              }}
            />
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
              placeholder="Start typing..."
              style={{ 
                flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)',
                fontSize: '1.1rem', lineHeight: '1.7', resize: 'none', width: '100%', fontFamily: 'var(--font-sans)'
              }}
            />
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <FileText size={48} style={{ opacity: 0.2 }} />
              <p>Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}