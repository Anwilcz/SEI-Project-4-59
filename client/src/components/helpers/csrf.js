export const csrfToken = () => {
  let token = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken' + '=')) {
        token = decodeURIComponent(cookie.substring('csrftoken'.length + 1))
        break
      }
    }
  }
  return token
}
