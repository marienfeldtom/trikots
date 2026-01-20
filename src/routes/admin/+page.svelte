<script>
    import { enhance } from '$app/forms';
    import { genders, sizes, types, conditions } from '$lib/constants';
    export let data;
    
    let selectedGender = 'Herren';
</script>

<style>
    .container {
        padding: 1rem;
        max-width: 600px;
        margin: 0 auto;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #068300; /* Replaced dark color with brand color */
    }

    .card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        border-top: 4px solid #068300; /* Added brand accent */
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-weight: 500;
        font-size: 0.9rem;
    }

    select, input {
        padding: 0.75rem;
        border: 1px solid #d4d4d8;
        border-radius: 8px;
        font-size: 1rem;
        background: #fff;
    }

    button[type="submit"] {
        background-color: #068300; /* Updated brand color */
        color: white;
        font-weight: 600;
        padding: 0.75rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 0.5rem;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .item-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #e4e4e7;
        border-left: 4px solid #e4e4e7;
    }
    
    .item-card.condition-Wie-neu { border-left-color: #22c55e; }
    .item-card.condition-Wenig-Backe { border-left-color: #eab308; }
    .item-card.condition-Viel-Backe { border-left-color: #ef4444; }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .info strong {
        color: #068300; /* Updated brand color */
        font-size: 1.1rem;
    }

    .info span {
        font-size: 0.9rem;
        color: #52525b;
    }
    
    .info .condition-tag {
        font-size: 0.75rem;
        background: #f4f4f5;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        display: inline-block;
        width: fit-content;
    }

    .delete-btn {
        background-color: #dc2626;
        color: white;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
    }
</style>

<div class="container">
    <h1>Admin: TuRa Trikots</h1>
    
    <form method="POST" action="?/add" use:enhance class="card">
        <h2>Neues Teil hinzufügen</h2>
        
        <label>
            Geschlecht
            <select name="gender" bind:value={selectedGender}>
                {#each genders as gender}
                    <option value={gender}>{gender}</option>
                {/each}
            </select>
        </label>
        
        <label>
            Typ
            <select name="type">
                {#each types as type}
                    <option value={type}>{type}</option>
                {/each}
            </select>
        </label>
        
        <label>
            Größe
            <select name="size">
                {#each sizes[selectedGender] as size}
                    <option value={size}>{size}</option>
                {/each}
            </select>
        </label>
        
        <label>
            Nummer
            <input type="number" name="number" required placeholder="z.B. 7">
        </label>

        <label>
            Zustand
            <select name="condition">
                {#each conditions as condition}
                    <option value={condition}>{condition}</option>
                {/each}
            </select>
        </label>
        
        <button type="submit">Hinzufügen</button>
    </form>
    
    <h2>Inventar ({data.items.length})</h2>
    <div class="list">
        {#each data.items as item}
            <div class="item-card condition-{item.condition.replace(/\s+/g, '-')}">
                <div class="info">
                    <strong>#{item.number}</strong>
                    <span>{item.type}</span>
                    <span>{item.size} • {item.gender}</span>
                    <span class="condition-tag">{item.condition}</span>
                </div>
                <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="id" value={item.id}>
                    <button type="submit" class="delete-btn">Löschen</button>
                </form>
            </div>
        {/each}
    </div>
</div>
