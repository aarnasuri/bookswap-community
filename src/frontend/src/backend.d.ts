import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Profile {
    id: UserId;
    bio: string;
    name: string;
    joinedAt: Timestamp;
    avatarUrl?: string;
}
export interface BookWithOwner {
    ownerName: string;
    book: Book;
}
export interface ChatThread {
    id: ChatId;
    participant1: UserId;
    participant2: UserId;
    requestId: RequestId;
    createdAt: Timestamp;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type RequestId = bigint;
export type BookId = bigint;
export type AuthResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface SaveProfileInput {
    bio: string;
    name: string;
    avatarUrl?: string;
}
export interface AddBookInput {
    title: string;
    author: string;
    coverImage?: ExternalBlob;
    genre: string;
    condition: BookCondition;
}
export type ChatId = bigint;
export interface Book {
    id: BookId;
    title: string;
    owner: UserId;
    createdAt: Timestamp;
    author: string;
    coverImage?: ExternalBlob;
    availability: AvailabilityStatus;
    genre: string;
    condition: BookCondition;
}
export interface BookRequest {
    id: RequestId;
    status: RequestStatus;
    bookOwnerId: UserId;
    createdAt: Timestamp;
    bookId: BookId;
    updatedAt: Timestamp;
    requesterId: UserId;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = string;
export type MessageId = bigint;
export interface GoogleBookResult {
    id: string;
    title: string;
    thumbnail: string;
    publishedDate: string;
    isbn: string;
    publisher: string;
    description: string;
    authors: Array<string>;
    printType: string;
}
export interface Message {
    id: MessageId;
    text: string;
    sentAt: Timestamp;
    chatId: ChatId;
    senderId: UserId;
}
export interface EditBookInput {
    title: string;
    author: string;
    coverImage?: ExternalBlob;
    genre: string;
    condition: BookCondition;
}
export enum AvailabilityStatus {
    available = "available",
    unavailable = "unavailable"
}
export enum BookCondition {
    new_ = "new",
    fair = "fair",
    good = "good",
    poor = "poor"
}
export enum RequestStatus {
    pending = "pending",
    accepted = "accepted",
    declined = "declined"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptBookRequest(token: string, requestId: RequestId): Promise<BookRequest | null>;
    addBook(token: string, input: AddBookInput): Promise<Book>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    declineBookRequest(token: string, requestId: RequestId): Promise<BookRequest | null>;
    deleteBook(token: string, bookId: BookId): Promise<boolean>;
    editBook(token: string, bookId: BookId, input: EditBookInput): Promise<Book | null>;
    getAllAvailableBooks(): Promise<Array<BookWithOwner>>;
    getBookDetail(bookId: BookId): Promise<BookWithOwner | null>;
    getCallerUserProfile(token: string): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatMessages(token: string, chatId: ChatId): Promise<Array<Message>>;
    getMyBooks(token: string): Promise<Array<Book>>;
    getMyChatThreads(token: string): Promise<Array<ChatThread>>;
    getMyRequestInbox(token: string): Promise<Array<BookRequest>>;
    getMyRequests(token: string): Promise<Array<BookRequest>>;
    getOrCreateChatThread(token: string, requestId: RequestId): Promise<ChatThread>;
    getSession(token: string): Promise<UserId | null>;
    getUserProfile(userId: UserId): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    login(email: string, password: string): Promise<AuthResult>;
    register(email: string, password: string): Promise<AuthResult>;
    saveCallerUserProfile(token: string, input: SaveProfileInput): Promise<void>;
    searchBooks(searchTerm: string): Promise<Array<BookWithOwner>>;
    searchGoogleBooks(searchQuery: string): Promise<{
        __kind__: "ok";
        ok: Array<GoogleBookResult>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    sendBookRequest(token: string, bookId: BookId): Promise<BookRequest>;
    sendMessage(token: string, chatId: ChatId, text: string): Promise<Message>;
    setBookAvailability(token: string, bookId: BookId, status: AvailabilityStatus): Promise<Book | null>;
    signOut(token: string): Promise<void>;
    transformGoogleBooksResponse(input: TransformationInput): Promise<TransformationOutput>;
}
