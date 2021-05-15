/**
 * @author Cooper Cowley
 *
 * @description This class is an implementation of the Array class, it offers some extra features which it's superclass does not.
 */
export default class ArrayList<E> extends Array<E> {

    constructor() {
        super(); // Invokes the parent class Array's constructor.
    }

    /**
     * @description removes a given element from the list.
     * @param element the element to remove from the list.
     * @return whether or not the operation was successful.
     */
    public remove(element: E): boolean {
        const index: number = this.indexOf(element); // Find the index of the given element.

        /**
         * Attempts to splice the list at the index of the given element and
         * catches any errors thrown if the given element does not exist in the list.
         */
        try {
            this.splice(index, 1); // Splice the list at the index of the given element.
            return true; // Array splicing was successful, return true.
        } catch(exception) {
            return false; // Array splicing was not successful, return false.
        }
    }

}