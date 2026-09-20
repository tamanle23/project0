import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePostStore } from '../store/usePostStore';
import { GlassButton } from '../components/GlassButton';

export const CreatePostScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const addPost = usePostStore((state) => state.addPost);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handlePublish = () => {
    if (!content.trim()) return;
    
    addPost({
      id: Math.random().toString(36).substr(2, 9),
      author: { id: 'u1', username: 'GuestUser' },
      content: content.trim(),
      tags: tags.split(' ').filter(t => t.startsWith('#')).map(t => t.replace('#', '')),
      timestamp: Date.now(),
    });
    
    setContent('');
    setTags('');
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + 54,
            paddingBottom: insets.bottom + 90,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          multiline
          autoFocus
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={[styles.tagInput, { color: colors.text, borderColor: colors.border }]}
          placeholder="#tags (space separated)"
          placeholderTextColor="#888"
          value={tags}
          onChangeText={setTags}
        />
        <View style={styles.actions}>
          <GlassButton title="Publish" onPress={handlePublish} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  input: {
    fontSize: 18,
    minHeight: 120,
    textAlignVertical: 'top',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  tagInput: {
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 24,
  },
  actions: {
    alignItems: 'flex-end',
  },
});
