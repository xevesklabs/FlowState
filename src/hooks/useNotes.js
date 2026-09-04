import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export function useNotes() {
  // Fetch all notes, most recently updated first
  const notes = useLiveQuery(
    () => db.notes.orderBy('updatedAt').reverse().toArray()
  ) ?? [];

  const addNote = async () => {
    const newNoteId = await db.notes.add({
      title: '',
      content: '',
      tags: [],
      isPinned: false,
      updatedAt: Date.now(),
    });
    return newNoteId;
  };

  const updateNote = async (id, changes) => {
    await db.notes.update(id, { 
      ...changes, 
      updatedAt: Date.now() 
    });
  };

  const deleteNote = async (id) => {
    await db.notes.delete(id);
  };

  const togglePin = async (id, isPinned) => {
    await db.notes.update(id, { 
      isPinned: !isPinned,
      updatedAt: Date.now()
    });
  };

  return { 
    notes,
    pinnedNotes: notes.filter(n => n.isPinned),
    unpinnedNotes: notes.filter(n => !n.isPinned),
    addNote, 
    updateNote, 
    deleteNote,
    togglePin
  };
}