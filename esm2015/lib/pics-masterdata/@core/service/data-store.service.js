import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class DataStoreService {
    constructor() {
        this.currentStoreSubject = new BehaviorSubject({});
        this.currentStore = this.currentStoreSubject.asObservable();
        // test code
    }
    setData(key, value) {
        const currentStore = this.getCurrentStore();
        currentStore[key] = value;
        this.currentStoreSubject.next(currentStore);
    }
    setObject(value) {
        this.currentStoreSubject.next(value);
    }
    getData(key) {
        const currentStore = this.getCurrentStore();
        return currentStore[key];
    }
    clearStore() {
        const currentStore = this.getCurrentStore();
        Object.keys(currentStore).forEach((key) => {
            delete currentStore[key];
        });
        this.currentStoreSubject.next(currentStore);
    }
    getCurrentStore() {
        return this.currentStoreSubject.value;
    }
}
DataStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DataStoreService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdG9yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL21hc3RlcmRhdGEvc3JjL2xpYi9waWNzLW1hc3RlcmRhdGEvQGNvcmUvc2VydmljZS9kYXRhLXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUl2QyxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCO1FBSFEsd0JBQW1CLEdBQUcsSUFBSSxlQUFlLENBQU0sRUFBUyxDQUFDLENBQUM7UUFDM0QsaUJBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHNUQsWUFBWTtJQUNkLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDN0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDakIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEMsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDO0lBQ3hDLENBQUM7OzhHQWpDVSxnQkFBZ0I7a0hBQWhCLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFTdG9yZVNlcnZpY2Uge1xuICBwcml2YXRlIGN1cnJlbnRTdG9yZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oe30gYXMgYW55KTtcbiAgcHVibGljIGN1cnJlbnRTdG9yZSA9IHRoaXMuY3VycmVudFN0b3JlU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0ZXN0IGNvZGVcbiAgfVxuXG4gIHNldERhdGEoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50U3RvcmUgPSB0aGlzLmdldEN1cnJlbnRTdG9yZSgpO1xuICAgIGN1cnJlbnRTdG9yZVtrZXldID0gdmFsdWU7XG4gICAgdGhpcy5jdXJyZW50U3RvcmVTdWJqZWN0Lm5leHQoY3VycmVudFN0b3JlKTtcbiAgfVxuXG4gIHNldE9iamVjdCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5jdXJyZW50U3RvcmVTdWJqZWN0Lm5leHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0RGF0YShrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgY3VycmVudFN0b3JlID0gdGhpcy5nZXRDdXJyZW50U3RvcmUoKTtcbiAgICByZXR1cm4gY3VycmVudFN0b3JlW2tleV07XG4gIH1cblxuICBjbGVhclN0b3JlKCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdG9yZSA9IHRoaXMuZ2V0Q3VycmVudFN0b3JlKCk7XG4gICAgT2JqZWN0LmtleXMoY3VycmVudFN0b3JlKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGRlbGV0ZSBjdXJyZW50U3RvcmVba2V5XTtcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRTdG9yZVN1YmplY3QubmV4dChjdXJyZW50U3RvcmUpO1xuICB9XG5cbiAgZ2V0Q3VycmVudFN0b3JlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0b3JlU3ViamVjdC52YWx1ZTtcbiAgfVxufVxuIl19