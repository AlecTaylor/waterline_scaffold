///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/es6-promise/es6-promise.d.ts"/>

declare var waterline: WaterlineMod.Wl;

declare module WaterlineMod {
    export interface Wl {
        new (): Wl;
        _collections: string[];
        _connections: {};
        loadCollection(collection: {}): Collection;
        initialize(options: {}, cb: (err: any, ontology: any) => void): InitError;
        Collection: Collection;
    }

    interface InitError {
      err: any;
      ontology: any;
    }

    export interface Model {
        attributes: Object;

        create(params: Object): WaterlinePromise<QueryResult>;
        create(params: Array<Object>): WaterlinePromise<QueryResult>;
        create(params: Object, cb: (err: Error, created: QueryResult) => void): void;
        create(params: Array<Object>, cb: (err: Error, created: Array<QueryResult>) => void): void;

        find(): QueryBuilder;
        find(params: Object): QueryBuilder;
        find(params: Object): WaterlinePromise<Array<QueryResult>>;

        findOne(criteria: Object): WaterlinePromise<QueryResult>;

        count(criteria: Object): WaterlinePromise<number>;
        count(criteria: Array<Object>): WaterlinePromise<number>;
        count(criteria: string): WaterlinePromise<number>;
        count(criteria: number): WaterlinePromise<number>;

        count(criteria: Object, cb: (err: Error, found: number) => void);
        count(criteria: Array<Object>, cb: (err: Error, found: number) => void);
        count(criteria: string, cb: (err: Error, found: number) => void);
        count(criteria: number, cb: (err: Error, found: number) => void);

        destroy(criteria: Object): WaterlinePromise<Array<Record>>;
        destroy(criteria: Array<Object>): WaterlinePromise<Array<Record>>;
        destroy(criteria: string): WaterlinePromise<Array<Record>>;
        destroy(criteria: number): WaterlinePromise<Array<Record>>;

        destroy(criteria: Object, cb: (err: Error, deleted: Array<Record>) => void): void;
        destroy(criteria: Array<Object>, cb: (err: Error, deleted: Array<Record>) => void): void;
        destroy(criteria: string, cb: (err: Error, deleted: Array<Record>) => void): void;
        destroy(criteria: number, cb: (err: Error, deleted: Array<Record>) => void): void;

        update(criteria: Object, changes: Object): WaterlinePromise<Array<QueryResult>>;
        update(criteria: Array<Object>, changes: Object): WaterlinePromise<Array<QueryResult>>;
        update(criteria: string, changes: Object): WaterlinePromise<Array<QueryResult>>;
        update(criteria: number, changes: Object): WaterlinePromise<Array<QueryResult>>;

        update(criteria: Object, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;
        update(criteria: Array<Object>, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;
        update(criteria: string, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;
        update(criteria: number, changes: Array<Object>): WaterlinePromise<Array<QueryResult>>;

        update(criteria: Object, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;
        update(criteria: Array<Object>, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;
        update(criteria: string, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;
        update(criteria: number, changes: Array<Object>, cb: (err: Error, updated: Array<QueryResult>) => void): void;

        query(sqlQuery: string, cb: (err: Error, results: Array<Record>) => void);
        native(cb: (err: Error, collection: Model) => void);

        stream(criteria: Object, writeEnd: Object): NodeJS.WritableStream;
        stream(criteria: Array<Object>, writeEnd: Object): NodeJS.WritableStream;
        stream(criteria: string, writeEnd: Object): NodeJS.WritableStream;
        stream(criteria: number, writeEnd: Object): NodeJS.WritableStream;

        stream(criteria: Object, writeEnd: Object): Error;
        stream(criteria: Array<Object>, writeEnd: Object): Error;
        stream(criteria: string, writeEnd: Object): Error;
        stream(criteria: number, writeEnd: Object): Error;
    }

    export interface WaterlinePromise<T> extends Promise<T> {
        exec(cb: (err: Error, results: Array<QueryResult>) => void);
        exec(cb: (err: Error, result: QueryResult) => void);
    }

    export interface Record {
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }
    export interface QueryResult extends Record {
        destroy(): Promise<Array<QueryResult>>;
        toJSON(): Object;
    }

    export interface QueryBuilder extends Promise<any> {
        exec(cb: (error: any, results: Array<QueryResult>) => void);

        where(condition: Object): QueryBuilder;
        limit(lim: number): QueryBuilder;
        skip(num: number): QueryBuilder;
        sort(criteria: string): QueryBuilder;
        populate(association: string): QueryBuilder;
        populate(association: string, filter: Object): QueryBuilder;
    }

    interface SingleResult {
        (err: Error, model: any): void;
    }

    interface MultipleResult {
        (err: Error, models: any[]): void;
    }

    interface Result<T> {
        done(callback: T): void;
    }

    interface IQuery {
        where(query: {}): IQuery;
        skip(count: number): IQuery;
        limit(count: number): IQuery;
        sort(query: string): IQuery;
        sort(query: {}): IQuery;
        done(callback: MultipleResult): void;
    }

    interface CollectionInitializeCallback {
        (err: Error, model: Collection): void;
    }

    export interface Collection {
        constructor(options: {}, callback: CollectionInitializeCallback);
        findOne(filter: any): Result<SingleResult>;
        find(): IQuery;
        find(query: {}): IQuery;
        query(query: string): Result<MultipleResult>;

        create(model: {}): Result<SingleResult>;
        update(query: {}, change: {}, callback: Result<SingleResult>);
        destroy(query: {}): Result<SingleResult>;

        //static extend(model: {}): any;
        extend(model: {}): any;
    }

}

declare module "waterline" {
    export = waterline;
}
