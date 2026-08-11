import Toast from './Toast'
import useStore from '../store/useStore'

export default function GlobalToasts() {
  const toast = useStore((s) => s.toast)
  const clear = useStore((s) => s.clearToast)

  return <Toast message={toast} onClose={clear} />
}
