import shellEscape from 'shell-escape'

export function escapeShellArg(val: string) {
  return shellEscape([val])
}

export const escapeShellArgs = shellEscape
