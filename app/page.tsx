"use client"

import { useState } from 'react'
import { users, User } from '../mockData'
import UserTable from '../components/UserTable'
import EditDrawer from '../components/EditDrawer'
import ConfirmDialog from '../components/ConfirmDialog'
import { Toast } from '../components/Toast'

export default function Home() {
  const [data, setData] = useState<User[]>(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [tempUser, setTempUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // ユーザー編集ボタンが押されたときの処理
  const handleEdit = (user: User) => {
    if (isDrawerOpen) {
      // 編集中に他のユーザーを選択した場合の処理
      if (JSON.stringify(editedUser) !== JSON.stringify(selectedUser)) {
        setIsDialogOpen(true)
        setTempUser(user)
      } else {
        // 編集内容に変更がない場合、選択ユーザーを更新
        setIsLoading(true)
        setTimeout(() => {
          setSelectedUser(user)
          setEditedUser(user)
          setIsLoading(false)
        }, 200)
      }
      // ドロワーが閉じている場合、ドロワーを開きユーザー情報を設定
    } else {
      setSelectedUser(user)
      setEditedUser(user)
      setIsDrawerOpen(true)
    }
  }

  // 編集内容を保存する処理
  const handleSave = () => {
    if (editedUser) {
      setData(data.map(user => user.id === editedUser.id ? editedUser : user))
      setIsDrawerOpen(false)
      setSelectedUser(null)
      setEditedUser(null)
      setShowToast(true)
    }
  }

  // 編集をキャンセルする処理
  const handleCancel = () => {
    setIsDrawerOpen(false)
    setSelectedUser(null)
    setEditedUser(null)
  }

  // ドロワーを閉じる際の処理
  const handleDrawerClose = () => {
    if (editedUser && JSON.stringify(editedUser) !== JSON.stringify(selectedUser)) {
      setIsDialogOpen(true)
    } else {
      handleCancel()
    }
  }

  // 編集内容の破棄を確認する処理
  const handleConfirmDiscard = () => {
    setIsDialogOpen(false)
    setIsDrawerOpen(false)
    setSelectedUser(null)
    setEditedUser(null)
    setTempUser(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserTable users={data} onEdit={handleEdit} />
      <EditDrawer
        isOpen={isDrawerOpen}
        user={editedUser}
        onClose={handleDrawerClose}
        onSave={handleSave}
        onCancel={handleCancel}
        onChange={setEditedUser}
        isLoading={isLoading}
      />
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDiscard}
      />
      {showToast && (
        <Toast
          message="Changes saved successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

