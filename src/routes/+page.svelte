<script>
    import { genders, types } from '$lib/constants';
    export let data;

    let filterGender = 'Alle';
    let filterType = 'Alle';
    
    // Derived filtered items
    $: filteredItems = data.items.filter(item => {
        if (filterGender !== 'Alle' && item.gender !== filterGender) return false;
        if (filterType !== 'Alle' && item.type !== filterType) return false;
        return true;
    });
</script>

<style>
    .header {
        background: #0f172a;
        color: white;
        padding: 1.5rem 1rem;
        text-align: center;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
    
    .header h1 {
        margin: 0;
        font-size: 1.5rem;
    }

    .container {
        padding: 1rem;
        max-width: 800px;
        margin: 0 auto;
        padding-bottom: 4rem;
    }

    .section-title {
        font-size: 1.25rem;
        color: #334155;
        margin: 2rem 0 1rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 0.5rem;
    }

    /* Sets Grid */
    .sets-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
    }

    .set-card {
        background: white;
        border: 2px solid #22c55e; /* Green border for sets/success */
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .set-number {
        font-size: 2rem;
        font-weight: 800;
        color: #15803d;
        line-height: 1;
        margin-bottom: 0.25rem;
    }
    
    .set-details {
        font-size: 0.9rem;
        color: #64748b;
        font-weight: 500;
    }

    .badge {
        display: inline-block;
        background: #dcfce7;
        color: #15803d;
        padding: 0.2rem 0.5rem;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: bold;
        margin-top: 0.5rem;
    }

    /* Inventory Filters */
    .filters {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
    }

    select {
        padding: 0.5rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        background: white;
        font-size: 0.95rem;
    }

    /* Inventory List */
    .inventory-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .item-row {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .item-number {
        font-size: 1.25rem;
        font-weight: bold;
        color: #0f172a;
        width: 40px;
        text-align: center;
        background: #f1f5f9;
        padding: 0.25rem;
        border-radius: 6px;
    }

    .item-info {
        flex: 1;
    }

    .item-type {
        font-weight: 600;
        display: block;
    }

    .item-meta {
        font-size: 0.85rem;
        color: #64748b;
    }

    footer {
        text-align: center;
        margin-top: 3rem;
        font-size: 0.9rem;
    }
    
    a {
        color: #64748b;
        text-decoration: none;
    }
</style>

<div class="header">
    <h1>TuRa Handball Trikots</h1>
</div>

<div class="container">
    {#if data.sets.length > 0}
        <h2 class="section-title">✨ Vollständige Sets</h2>
        <div class="sets-grid">
            {#each data.sets as set}
                <div class="set-card">
                    <div class="set-number">{set.number}</div>
                    <div class="set-details">{set.size}</div>
                    <div class="badge">{set.gender}</div>
                </div>
            {/each}
        </div>
    {/if}

    <h2 class="section-title">Inventar Übersicht</h2>
    
    <div class="filters">
        <select bind:value={filterGender}>
            <option value="Alle">Alle Geschlechter</option>
            {#each genders as g}<option value={g}>{g}</option>{/each}
        </select>
        
        <select bind:value={filterType}>
            <option value="Alle">Alle Typen</option>
            {#each types as t}<option value={t}>{t}</option>{/each}
        </select>
    </div>

    <div class="inventory-list">
        {#each filteredItems as item}
            <div class="item-row">
                <div class="item-number">{item.number}</div>
                <div class="item-info">
                    <span class="item-type">{item.type}</span>
                    <span class="item-meta">{item.size} • {item.gender}</span>
                </div>
            </div>
        {/each}
        {#if filteredItems.length === 0}
            <p style="text-align: center; color: #94a3b8; padding: 2rem;">Keine Trikots gefunden.</p>
        {/if}
    </div>

    <footer>
        <a href="/admin">Admin Login</a>
    </footer>
</div>
