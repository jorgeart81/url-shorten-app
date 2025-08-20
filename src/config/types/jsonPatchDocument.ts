/**
 * Available operations in JSON Patch according to RFC 6902.
 * 
 * - `add`: Adds a new value at the specified path
 * - `remove`: Removes the value at the specified path
 * - `replace`: Replaces the existing value at the specified path
 * - `move`: Moves a value from one path to another
 * - `copy`: Copies a value from one path to another
 * - `test`: Verifies that the value at the path matches the expected value
 */
export type PatchOperation =
  | 'add'
  | 'remove'
  | 'replace'
  | 'move'
  | 'copy'
  | 'test';

/**
 * Represents an individual JSON Patch operation according to RFC 6902.
 * 
 * @interface JsonPatchOperation
 * @property {PatchOperation} op - Type of operation to perform
 * @property {string} path - JSON Pointer path to the target field
 * @property {unknown} value - Value to use in the operation (optional for some operations)
 * 
 * @example
 * ```typescript
 * const addOperation: JsonPatchOperation = {
 *   op: "add",
 *   path: "/title",
 *   value: "New Title"
 * };
 * 
 * const removeOperation: JsonPatchOperation = {
 *   op: "remove",
 *   path: "/oldField"
 * };
 * ```
 */
export interface JsonPatchOperation {
  op: PatchOperation;
  path: string;
  value: unknown;
}

/**
 * Array of JSON Patch operations that can be applied in a single request.
 * 
 * Allows performing multiple atomic modifications to a resource according to RFC 6902.
 * Operations are executed in the specified order.
 * 
 * @example
 * ```typescript
 * const patchDocument: JsonPatchDocument = [
 *   { op: "replace", path: "/title", value: "Updated Title" },
 *   { op: "add", path: "/description", value: "New description" },
 *   { op: "remove", path: "/tempField" }
 * ];
 * ```
 */
export type JsonPatchDocument = JsonPatchOperation[];
