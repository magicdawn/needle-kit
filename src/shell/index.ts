import shellEscape from 'shell-escape'

/**
 * @deprecated use shlex.quote instead
 */
export function escapeShellArg(val: string) {
  return shellEscape([val])
}

/**
 * @deprecated use shlex.quote instead
 */
export const escapeShellArgs = shellEscape
