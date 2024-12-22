import { CustomDrawer } from "./CustomDrawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User } from '../mockData'
import { useEffect, useState } from 'react'
import { Spinner } from "./Spinner"

interface EditDrawerProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
  onSave: () => void
  onCancel: () => void
  onChange: (user: User) => void
  isLoading: boolean
}

export default function EditDrawer({ isOpen, user, onClose, onSave, onCancel, onChange, isLoading }: EditDrawerProps) {
  const [isVisible, setIsVisible] = useState(false)

  // ドロワーの開閉に応じて表示状態を更新
  useEffect(() => {
    // ドロワーを表示する場合、表示状態をtrueにする
    if (isOpen) {
      setIsVisible(true)
      // ドロワーを閉じる場合、表示状態をfalseにする
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!user) return null

  // ユーザー情報の変更を受け取り、ユーザー情報を更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <CustomDrawer isOpen={isVisible} onClose={onClose} title="Edit User">
      <div className={`space-y-4 transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className={`relative ${isLoading ? 'opacity-50' : ''}`}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={user.name} onChange={handleChange} disabled={isLoading} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={user.email} onChange={handleChange} disabled={isLoading} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" value={user.role} onChange={handleChange} disabled={isLoading} />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>Cancel</Button>
            <Button onClick={onSave} disabled={isLoading}>Save changes</Button>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </CustomDrawer>
  )
}

