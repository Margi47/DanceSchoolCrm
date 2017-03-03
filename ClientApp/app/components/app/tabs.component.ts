import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component'

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit{
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter((tab) => tab.active);
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: TabComponent) {
        this.tabs.toArray().forEach(tab => tab.active = false);
        tab.active = true;
    }

}